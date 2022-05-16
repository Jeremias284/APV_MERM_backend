import Paciente from '../models/Paciente.js';

const agregarPaciente =async (req, res) =>{
    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id;
    try {
        const pacienteAlmacenado = await paciente.save();
        res.json(pacienteAlmacenado);
    } catch (error) {
         console.log(error)   
    }
};

const obtenerPacientes = (req, res) =>{
    const pacientes = await Paciente.find()
        .where("veterinario")
        .equals(req.veterinario);

    res.json(pacientes);
};

const obtenerPaciente =  async (req, res) => {
    const {id} = res.params;
    const paciente = await Paciente.findById(id);

    
    if(!paciente){
        res.status(404).json({msg: "No encontrado"})
    }
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({msg: "Accion no valida"});
    }

    res.json(paciente);
    

}
const actualizarPaciente = async (req, res) =>{
    const {id} = res.params;
    const paciente = await Paciente.findById(id);

    if(!paciente){
        res.status(404).json({msg: "No encontrado"})
    }
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({msg: "Accion no valida"});
    }
    //Actualizar Paciente
    paciente.nombre= req.boby.nombre || paciente.nombre;
    paciente.propietario= req.boby.propietario || paciente.propietario;
    paciente.email= req.boby.email || paciente.email;
    paciente.fecha= req.boby.fecha || paciente.fecha;
    paciente.sintomas= req.boby.sintomas || paciente.sintomas;

    try {
        const pacienteActualizado = await paciente.sabe();
        res.json(pacienteActualizado);
    } catch (error) {
        console.log(error)
    }
    
}
const eliminarPaciente = async (res, req) =>{
    const {id} = res.params;
    const paciente = await Paciente.findById(id);

    if(!paciente){
        res.status(404).json({msg: "No encontrado"})
    }
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({msg: "Accion no valida"});
    }

    try {
        await paciente.deleteOne();
        res.json({msg: "Paciente Eliminar"});
    } catch (error) {
        console.log(error)
    }
}

export {agregarPaciente, obtenerPacientes, obtenerPaciente, actualizarPaciente, eliminarPaciente}