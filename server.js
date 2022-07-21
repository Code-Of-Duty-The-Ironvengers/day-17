const express = require("express");

const students = [
  { name: "Kira", country: "Germany" },
  { name: "Vicent", country: "Germany" },
  { name: "Guillermo", country: "Espain" },
  { name: "Daiane", country: "Brazil" },
  { name: "Tony", country: "Netherlands" },
  { name: "Asem", country: "Syria" },
  { name: "Pelayo", country: "Espain" },
  { name: "Maxime", country: "Netherlands" },
  { name: "João", country: "Portugal" },
  { name: "Tiffany", country: "Taiwan" },
  { name: "Elvan", country: "Germany" },
  { name: "Nico", country: "France" },
  { name: "Diana", country: "France" },
  { name: "Palash", country: "UAE" },
  { name: "Filipe", country: "Sweeden" },
];

// home page: input that allows user to search for a specific name CHECK
// when user submits the input, we check if there is a student with that name
// if so, show the page for that student
// if not, show an error

const app = express();

app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: false }));
let numberOfRequests = 0;

app.get("/", (req, res) => {
  console.log(
    `WHEN CALLING THIS URL ${++numberOfRequests} requests have been made`
  );
  console.log(req.query);
  res.render("student-home-page");
});

app.get("/create-student", (req, res) => {
  res.render("create-student-form");
});

app.post("/create-student", (req, res) => {
  //
  const { studentName, country } = req.body;
  console.log(req.body);
  students.push({ name: studentName, country });
  //   res.render("create-student");
  res.redirect("/");
});

app.get("/search", (req, res) => {
  const singleStudent = students.find(
    (student) =>
      student.name.toLowerCase() === req.query.studentName.toLowerCase()
  );

  if (!singleStudent) {
    // res.render("you-suck");
    res.redirect("/ah-you-suck");
    return;
  }

  res.render("search", { student: singleStudent });
});

app.get("/ah-you-suck", (req, res) => {
  res.render("you-suck");
});

app.listen(8910, () => {
  console.log("Almost michael jackson, easy as xyz");
});
