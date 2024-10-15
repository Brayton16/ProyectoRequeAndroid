import {getConnection} from '../database/connection.js';
import emailService from "../services/emailService.js";
import sql from 'mssql';



export const getProyects = async (req, res) => {
    const { query } = req.query; // Obtiene el parámetro de consulta de la URL

    try {

        const pool = await getConnection(); // Asumiendo que esta es tu función para obtener conexión a la base de datos
        const result = await pool.request()
            .input("SearchQuery", sql.NVarChar, query || '') // Usa el parámetro de consulta de la búsqueda, o una cadena vacía si no se proporciona
            .execute('GetActiveProjects');
        res.json(result.recordset); // Envía los datos como JSON
    } catch (error) {
        res.status(500).send(error.message); // Maneja errores
    }
};
 
export const getProyectsByCategory = async (req, res) => {
    const { query } = req.query; // Obtiene el parámetro de consulta de la URL

    try {
        const pool = await getConnection(); // Asumiendo que esta es tu función para obtener conexión a la base de datos
        const result = await pool.request()
            .input("SearchQuery", sql.NVarChar, query || '') // Usa el parámetro de consulta de la búsqueda, o una cadena vacía si no se proporciona
            .execute('GetActiveProjectsByCategory');
        res.json(result.recordset); // Envía los datos como JSON
    } catch (error) {
        res.status(500).send(error.message); // Maneja errores
    }
}

export const getProyectsByFundingGoal = async (req, res) => {
    const { query } = req.query; // Obtiene el parámetro de consulta de la URL

    try {
        const pool = await getConnection(); // Asumiendo que esta es tu función para obtener conexión a la base de datos
        const result = await pool.request()
            .input("SearchQuery", sql.NVarChar, query || '') // Usa el parámetro de consulta de la búsqueda, o una cadena vacía si no se proporciona
            .execute('GetActiveProjectsByFundingGoal');
        res.json(result.recordset); // Envía los datos como JSON
    } catch (error) {
        res.status(500).send(error.message); // Maneja errores
    }
}

export const getProyectsByCollection = async (req, res) => {
    const { query } = req.query; // Obtiene el parámetro de consulta de la URL
    console.log("getProyectsByCollection", query)

    try {
        const pool = await getConnection(); // Asumiendo que esta es tu función para obtener conexión a la base de datos
        const result = await pool.request()
            .input("SearchQuery", sql.NVarChar, query || '') // Usa el parámetro de consulta de la búsqueda, o una cadena vacía si no se proporciona
            .execute('GetActiveProjectsByCollection');
        res.json(result.recordset); // Envía los datos como JSON
    } catch (error) {
        res.status(500).send(error.message); // Maneja errores
    }
}

export const getProyectsByLimitDate = async (req, res) => {
    const { query } = req.query; // Obtiene el parámetro de consulta de la URL

    try {
        const pool = await getConnection(); // Asumiendo que esta es tu función para obtener conexión a la base de datos
        const result = await pool.request()
            .input("SearchQuery", sql.DateTime, query || '') // Usa el parámetro de consulta de la búsqueda, o una cadena vacía si no se proporciona
            .execute('GetActiveProjectsByLimitDate');
        res.json(result.recordset); // Envía los datos como JSON
    } catch (error) {
        res.status(500).send(error.message); // Maneja errores
    }
}

export const getProyect = async (req, res) => {
    const { query, userID } = req.query; // Obtiene los parámetros de consulta de la URL

    try {
        const pool = await getConnection(); // Obtiene la conexión a la base de datos
        const result = await pool.request()
            .input("UserID", sql.Int, userID) // Agrega el parámetro de userID
            .input("SearchQuery", sql.NVarChar, query || '') // Agrega el parámetro de búsqueda
            .execute('GetActiveProject');
        res.json(result.recordset); // Envía los datos como JSON
    } catch (error) {
        res.status(500).send(error.message); // Maneja errores
    }
};

export const createProyect = async (req, res) => {
    const { idUser, titulo, descripcion, ubicacion, categoria, dinero, fechaHora, historial } = req.body;

    console.log(req.body)
    // Se verifica si algún campo requerido no se ingresó
    if (
        idUser == null || titulo == null || descripcion == null || ubicacion == null 
        || categoria == null || historial == null || dinero == null || fechaHora == null
    ){
        return res.status(400).json({ msg: "Error: Información incompleta" });
    }

    try {

        const pool = await getConnection();
        const result = await pool.request()
            .input("ProjectName", sql.NVarChar, titulo)
            .input("ProjectDescription", sql.NVarChar, descripcion)
            .input("FundingGoal", sql.Decimal, dinero)
            .input("Category", sql.NVarChar, categoria)
            .input("OwnerID", sql.Int, idUser)
            .input("FundingDeadline", sql.DateTime, fechaHora)
            .output("FirstName", sql.NVarChar)
            .output("Email", sql.VarChar)
            .execute('InsertProject');
        let firstName = result.output.FirstName;
        let email = result.output.Email;

        // Enviar correo de registro de proyecto
        await emailService.sendRegisterProyect({ titulo, email, firstName });

        return res.status(201).json({
            message: "Proyecto registrado exitosamente.",
            firstName,
            email,
            titulo
        });
    } catch (error) {
        res.status(500).send(error.message); // Enviar mensaje de error
    }
};


export const updateProyect = async (req, res) =>{
    const {ProjectName, ProjectDescription, FundingGoal, FundingDeadline
        , MediaURL, Category, idProyect} = req.body;

    // se verifica si algun campo requerido no se ingreso
    if (
        idProyect == null
    ){ 
        return res.status(400).json({ msg: "Error: Informacion incompleta" });
    }

    try{
        const pool = await getConnection()
    
        const result = await pool.request()
        .input("ProjectID", sql.Int, idProyect)
        .input("ProjectName", sql.NVarChar, ProjectName)
        .input("ProjectDescription", sql.NVarChar, ProjectDescription)
        .input("FundingGoal", sql.Decimal, FundingGoal)
        .input("FundingDeadline", sql.DateTime, FundingDeadline)
        .input("MediaURL", sql.NVarChar, MediaURL)
        .input("Category", sql.NVarChar, Category)
        .output("FirstName" , sql.NVarChar)
        .output("Email", sql.VarChar)
        .execute('updateProyect')

        let firstName  = result.output.FirstName;
        let email = result.output.Email;

        // envia correo de registro de proyecto
        await emailService.sendUpdateProyect({ProjectName, email, firstName});
            
        return res.status(201).json({
            message: "Proyecto modificado exitosamente.",
            firstName,
            email, 
            ProjectName
        });
    }
    catch(error){
        res.status(500);
        res.send(error.message);
    }
};

export const deleteProyect = async (req, res) =>{
    const {id} = req.body;

    // se verifica si algun campo requerido no se ingreso
    if (
        id == null
    ){ 
        return res.status(400).json({ msg: "Error: Informacion incompleta" });
    }

    try{
        const pool = await getConnection()
        const result = await pool
        .request()
        .input("id", sql.Int, id)
        .execute('DeactivateProject')

        if(result.rowsAffected[0] === 0){
            return res.status(404).json({message: "Proyecto no encontrado"});
        }

        return res.json({message: "Proyecto eliminado correctamente"});
    }
    catch(error){        
        res.status(500);
        res.send(error.message);
    }
};

export const activeProjectsCount = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .query(
            "SELECT COUNT(*) AS ActiveProjectCount FROM Projects WHERE IsActive = 1"
        );
        
        const activeProjectCount = result.recordset[0].ActiveProjectCount;
        //res.json(result.recordset); // Envía los datos como JSON
        res.json({ activeProjectCount });
    
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}