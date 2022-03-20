const Sequelize = require("sequelize");

const sql = new Sequelize("cursos", "postgres", "", {
  host: "localhost",
  dialect: "postgres",
});

const Curso = sql.define("Curso", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nivel: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  fecha: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  duracion: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = { sql, Curso };
