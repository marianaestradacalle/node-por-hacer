const fs = require('fs');


let listadoPorHacer = [];

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar');

    });
};

const cargarDB = () => {

    try {

        listadoPorHacer = require('../db/data.json');

    } catch (error) {

        listadoPorHacer = [];

    }

};

const crear = (desc) => {

    cargarDB();

    let porHacer = {
        desc,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
};

const getListado = () => {

    cargarDB();
    return listadoPorHacer;

};


const actualizar = (desc, compl = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.desc === desc);

    if (index >= 0) {
        listadoPorHacer[index].completado = compl;
        guardarDB();
        return true;
    } else {
        return false;
    }
};

const borrar = (desc) => {
    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => tarea.desc !== desc);

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
};

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
};