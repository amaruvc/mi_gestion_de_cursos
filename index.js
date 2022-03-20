const express = require("express");
const { sql, Curso } = require("./models/cursos");
const nunjucks = require("nunjucks");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("static"));

app.use(bodyParser.json());
//Para sincronizar la bd
async function syncBD() {
  await sql.sync({ force: true });
}
// syncBD();

nunjucks.configure("templates", {
  express: app,
  autoescape: true,
  watch: true,
});

async function nuevoCurso(nombre, nivel, fecha, duracion) {
  try {
    const t = await sql.transaction();
    const newT = await Curso.create(
      {
        nombre,
        nivel,
        fecha,
        duracion,
      },
      { transaction: t }
    );
    await t.commit();
  } catch (error) {
    console.error(error);
    await t.rollback();
  }
}

app.get("/", (req, res) => {
  res.render("index.html");
});

app.get("/cursos", async (req, res) => {
  const cursos = await Curso.findAll();
  res.json(cursos);
});

app.post("/curso", async (req, res) => {
  const nombre = req.body.nombre;
  const nivel = req.body.nivelTecnico;
  const fecha = req.body.fechaInicio;
  const duracion = req.body.duracion;

  await nuevoCurso(nombre, nivel, fecha, duracion);

  res.send("Curso agregado correctamente");
});

app.put("/curso", async (req, res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const nivel = req.body.nivelTecnico;
  const fecha = req.body.fechaInicio;
  const duracion = req.body.duracion;

  await Curso.update(
    {
      nombre,
      nivel,
      fecha,
      duracion,
    },
    {
      where: {
        id,
      },
    }
  );
  res.send("Curso editado correctamente");
});

app.delete("/curso/:id", async (req, res) => {
  const id = req.params.id;
  await Curso.destroy({
    where: {
      id,
    },
  });
  res.send("Curso eliminado corectamente");
});

app.listen(3000, () => {
  console.log("Server iniciado en el puerto 3000");
});
