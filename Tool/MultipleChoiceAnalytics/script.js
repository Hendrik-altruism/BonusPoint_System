import {
  render,
  template,
  spinner,
  loader,
} from "./resources/templates/template.js";
import * as helper from "./resources/helper.js";
import { generateGraph } from "./libs/highcharts/graph.js";

(async () => {
  // Object with the current Appstate
  const component = {
    name: "Bonuspunkte Datenbanken", // Title of the Component
    config: {
      datastores: [
        "mc-results",
        "dbs-results",
        "dbs-praktomat-results",
        "dbs-db_access-results",
      ], // names of the Datasets in th DB
      datastore_datasets: [
        "mc-results",
        "er_trainer",
        "er_rel_trainer",
        "praktomat",
        "db_access",
      ], // names of the Datasets
      datastore_names: [
        "Multiple Choice Trainer",
        "ER-Trainer",
        "ER-REL-Trainer",
        "Praktomat Übungen",
        "Datenbank Zugriffe",
      ], // Names of the Trainers
      datastore_url: "https://ccm2.inf.h-brs.de", // Url of the fetched DB
    },
    storedata: {}, // Fetch: Data per Trainer
    userdata: {}, // Calc: Run-Data per user
    grading: {
      mc: {
        //Grading for the Multiple Choice Trainers | 1 Try is 1*5 questions -> 5 Points
        normal_points: 1, // Normal point increase per try
        bonus_border: 2, // Amount of trys needed to get the bonus points
        bonus_points: 10, // Amount of bonus points awarded for each Trainer Goal
      },
      er: {
        // Grading for the Er-Trainers
        normal_points: 2, // Normal point increase per try
        bonus_border: 30, // Amount of trys needed to get the bonus points
        bonus_points: 60, // Amount of bonus points awarded for each Trainer Goal
      },
      praktomat: {
        // Grading of the Praktomat Tasks
        normal_points: 1, // Normal point increase per try
      },
    },
    highscores: {
      // Calc: 75% of the highest user score        -> Criteria 1
      trainer: { score: 0, border: 1500 },
      praktomat: { score: 0, border: 7 },
      db_access: { score: 0, border: 0 },
    },
    totalcrit: {
      // Total Points for the Criteria       -> Criteria 2
      trainer: { score: 500 },
      praktomat: { score: 3 },
      db_access: { score: 1 },
    }, // Score to get the guarenteed Bonus Grade -> Kriteria 2
    sort_value: "total", // Value after what the datasets are sorted
    graph: {
      //Setting to plot the graph
      setting: false,
      keyArray: [],
      rightArray: [],
      wrongArray: [],
    },
    mcKeyMap: {
      // Keys of the MC-Trainers
      "1646948865062X4657833375712839": 1,
      "1646950232792X6996067121879161": 2,
      "1646950835262X7860488205285787": 3,
      "1646951470659X01616614301246677": 4,
      "1646951990963X3157219323919205": 5,
      "1646952556432X7427428164230367": 6,
      "1646953043499X3488634243933265": 7,
      "1646953669897X22820584963140944": 8,
      "1646954184051X2346612535954038": 9,
      "1646955100145X14419257836222243": 10,
      "1646955608212X429518544174603": 11,
      "1646956016154X7552103753982761": 12,
      "1646956387263X4533669554911097": 13,
    },
    trainerLinks: [
      //Links to all the Trainers
      "https://ccmjs.github.io/digital-makerspace/show.html?id=1646950123324X4714192426662356",
      "https://ccmjs.github.io/digital-makerspace/show.html?id=1646950754258X8292928730538645",
      "https://ccmjs.github.io/digital-makerspace/show.html?id=1646951408862X18414771856262846",
      "https://ccmjs.github.io/digital-makerspace/show.html?id=1646951940873X25806068692911854",
      "https://ccmjs.github.io/digital-makerspace/show.html?id=1646952505707X5605413319265073",
      "https://ccmjs.github.io/digital-makerspace/show.html?id=1646953007449X02453587545110536",
      "https://ccmjs.github.io/digital-makerspace/show.html?id=1646953622948X8806083410396971",
      "https://ccmjs.github.io/digital-makerspace/show.html?id=1646954143459X9389979639455946",
      "https://ccmjs.github.io/digital-makerspace/show.html?id=1646954762549X33423193945747376",
      "https://ccmjs.github.io/digital-makerspace/show.html?id=1646955568642X1300242351729506",
      "https://ccmjs.github.io/digital-makerspace/show.html?id=1646955984471X4209577160461204",
      "https://ccmjs.github.io/digital-makerspace/show.html?id=1646956369935X80600913416449",
      "https://ccmjs.github.io/digital-makerspace/show.html?id=1646956892118X1755904801683642",
      "https://lea.hochschule-bonn-rhein-sieg.de/data/db_040811/lm_data/lm_1872854/ER-Trainer-MongoDB/index.html",
      "https://lea.hochschule-bonn-rhein-sieg.de/data/db_040811/lm_data/lm_1834293/ER-REL-Trainer-MongoDB/index.html",
    ],
    events: {
      // Events in template to Close the Modal etc
      openModal: () => {
        setTimeout(() => {
          const exampleModal = document.getElementById("student-Modal");
          calculateGraphData();
          generateGraph(component);
          document.body.style.overflow = "hidden";
          exampleModal.classList.add("show");
          exampleModal.style.display = "block";
          document.body.appendChild(
            helper.htmlToElement(`<div class="modal-backdrop show"></div>`)
          );
        }, 0);
      },
      closeModal: () => {
        const exampleModal = document.querySelector("#student-Modal");
        component.graph.setting = false;
        document.body.style.overflow = "auto";
        exampleModal.classList.remove("show");
        exampleModal.style.display = "none";
        document.querySelector(".modal-backdrop").remove();
      },
      openInfoModal: () => {
        setTimeout(() => {
          const exampleModal = document.getElementById("info-Modal");
          document.body.style.overflow = "hidden";
          exampleModal.classList.add("show");
          exampleModal.style.display = "block";
          document.body.appendChild(
            helper.htmlToElement(`<div class="modal-backdrop show"></div>`)
          );
        }, 0);
      },
      closeInfoModal: () => {
        const exampleModal = document.querySelector("#info-Modal");
        document.body.style.overflow = "auto";
        exampleModal.classList.remove("show");
        exampleModal.style.display = "none";
        document.querySelector(".modal-backdrop").remove();
      },
      toggleGraphSetting: () => {
        component.graph.setting = !component.graph.setting;
        if (component.graph.setting) {
          document.getElementById("switchGraphMode").innerHTML = "Total";
        } else {
          document.getElementById("switchGraphMode").innerHTML = "Prozent";
        }
        calculateGraphData();
        generateGraph(component);
      },
    },
  };

  // Function to add User to Storage
  let addUserEntry = (tempUser) => {
    if (component.userdata[tempUser] == null) {
      component.userdata[tempUser] = {};
      const newUser = {
        trainer: {
          er_trainer: { databaseScore: 0, runs: [] },
          er_rel_trainer: { databaseScore: 0, runs: [] },
          "mc-results": { databaseScore: 0 },
          databaseScore: 0,
          passed_one: false,
        },
        praktomat: {
          databaseScore: 0,
          tasks: {},
          passed_one: false,
        },
        db_access: {
          databaseScore: 0,
          passed_one: false,
        },
        passed_one: false,
        passed_two: false,
      };
      Object.assign(component.userdata[tempUser], newUser);
    }
  };

  //Function to change the filter
  let changeFilter = (value) => {
    component.sort_value = value;
    sortUserData();
    generateTable();
  };

  //Function to change the loader
  let changeLoader = (percent) => {
    document.querySelector(".loading-object").style.width = `${percent}%`;
  };

  // Login the in the FB02 Account with user data
  let loginUser;
  try {
    loginUser = await ccm.start(
      "https://ccmjs.github.io/akless-components/user/ccm.user.js",
      {
        realm: "hbrsinfkaul",
        root: document.body.querySelector("#user"),
        logged_in: true,
      }
    );
  } catch (error) {
    console.log("fail");
  }
  // Set the current User for identification
  component.user = loginUser.getValue().user;

  (function renderLoader() {
    render(loader(), document.body);
  })();

  let count = 12.5;
  changeLoader(count);
  for (const datastore of component.config.datastores) {
    const store = await ccm.store({
      url: component.config.datastore_url,
      name: datastore,
      user: loginUser,
    });
    count += 12.5;
    changeLoader(count);
    component.storedata[datastore] = await store.get({});
    count += 12.5;
    changeLoader(count);
  }

  //Prepare Multiple Choice Data
  (() => {
    const store = "mc-results";
    component.storedata[store].forEach((element) => {
      // Ckeck if the realm is hbrsinfkaul
      if (element._.realm != "hbrsinfkaul") {
        delete store.element;
      } else {
        const tempUser = element.user;
        delete element.user;
        addUserEntry(tempUser);
        //Manipulation of the Data and check for correct Data
        element["correctBonus"] = 0;
        element.questions.forEach((question) => {
          let correct = true;
          question.answers.forEach((answer) => {
            if (answer.solution != answer.input) {
              correct = false;
            }
          });
          correct
            ? (element["correctBonus"] += component.grading.mc.normal_points)
            : null;
        });

        delete element.questions; // Delete of Questions to save Space

        const userStore = component.userdata[tempUser]["trainer"][store];
        if (userStore[element.app] == null) {
          userStore[element.app] = {
            runs: [],
            trainerScore: 0,
          };
        }
        userStore[element.app].runs.push(element);

        //Add Score to User Data ? Runs per Trainer over 2 (5 Questions) : 10 Bonus Points
        let scoreAddition = component.grading.mc.normal_points * 5;
        userStore[element.app].runs.length == component.grading.mc.bonus_border
          ? (scoreAddition += component.grading.mc.bonus_points)
          : null;
        scoreAddition += element["correctBonus"];
        component.userdata[tempUser]["trainer"].databaseScore += scoreAddition;
        userStore.databaseScore += scoreAddition;
        userStore[element.app].trainerScore += scoreAddition;
      }
    });
  })();

  //Prepare ER Data
  (() => {
    const store = "dbs-results";
    component.storedata[store].forEach((element) => {
      // Ckeck if the realm is hbrsinfkaul
      if (element._.realm != "hbrsinfkaul") {
        delete store.element;
      } else {
        const tempUser = element.user;
        delete element.user;
        addUserEntry(tempUser);

        const userStore = component.userdata[tempUser]["trainer"][element.app];

        //Check if run has result
        if (element.hasOwnProperty("correct")) {
          userStore.runs.push(element);
          //Add Score to User Data ? Runs per Trainer over 30 : 60 Bonus Points
          let scoreAddition = component.grading.er.normal_points;
          userStore.runs.length == component.grading.er.bonus_border
            ? (scoreAddition += component.grading.er.bonus_points)
            : null;
          element.correct
            ? (scoreAddition += component.grading.er.normal_points)
            : null;
          component.userdata[tempUser]["trainer"].databaseScore +=
            scoreAddition;
          userStore.databaseScore += scoreAddition;
        }
      }
    });
  })();

  //Prepare PraktomatData
  (() => {
    const store = "dbs-praktomat-results";
    component.storedata[store].forEach((element) => {
      const tempUser = element.Username;
      addUserEntry(tempUser);

      const userStore = component.userdata[tempUser]["praktomat"];

      userStore.tasks[element.task.at(10)] = element;

      userStore.databaseScore += component.grading.praktomat.normal_points;
    });
  })();

  //Prepare db_access Data
  (() => {
    const store = "dbs-db_access-results";
    component.storedata[store].forEach((element) => {
      const tempUser = element.key;
      addUserEntry(tempUser);

      const userStore = component.userdata[tempUser]["db_access"];

      if (element.login >= 3 && element.eigen >= 1 && element.his >= 1) {
        userStore.databaseScore = 1;
      }
    });
  })();

  // Sort the User Data
  let sortUserData;
  (sortUserData = function () {
    let sortFun = (a, b) =>
      b[1]["trainer"].databaseScore - a[1]["trainer"].databaseScore;

    component.config.datastore_datasets.forEach((element) => {
      if (element == component.sort_value) {
        if (element.length > 9) {
          sortFun = (a, b) =>
            b[1]["trainer"][element].databaseScore -
            a[1]["trainer"][element].databaseScore;
        } else {
          sortFun = (a, b) =>
            b[1][element].databaseScore - a[1][element].databaseScore;
        }
      }
    });

    const userArray = Object.entries(component.userdata).sort((a, b) =>
      sortFun(a, b)
    );
    component.userdata = Object.fromEntries(userArray);
  })();

  // 75% of the highest score of the first 10% in the Highscore
  (() => {
    for (const [key, value] of Object.entries(component.highscores)) {
      const notCrit2 = Object.values(component.userdata).filter(
        (element) =>
          element[key].databaseScore <= component.highscores[key].border
      );
      const amount = Math.floor(Object.values(notCrit2).length / 10);
      let totalScore = 0;
      for (let i = 0; i < amount; i++) {
        totalScore += component.highscores[key]["score"] =
          Object.values(notCrit2)[i][key].databaseScore;
      }
      totalScore /= amount;
      totalScore *= 0.75;
      component.highscores[key].score = Math.floor(totalScore);
    }
  })();

  //Setting of the db_Access Scor to 1
  component.highscores["db_access"].score = 1;

  // Function to change the Content of the Body to current Appstate
  (function renderBody() {
    render(template(component), document.body);
  })();

  // All users and their Runs in an Object
  //console.log("Sortierte Nutzerdaten: ", component.userdata);

  // Listener to close the modal when the user clicks outside the modal
  (() => {
    window.addEventListener("click", ({ target }) => {
      const pop = target.closest(".modal-content");
      if (
        pop == null &&
        document.querySelector("#student-Modal").classList.contains("show")
      ) {
        component.events.closeModal();
      } else if (
        pop == null &&
        document.querySelector("#info-Modal").classList.contains("show")
      ) {
        component.events.closeInfoModal();
      }
    });
  })();

  //TODO
  // Generates the Table with User Data
  let generateTable;
  (generateTable = function () {
    document.querySelector("#table-students").innerHTML = "";
    // Creationg of the Table header
    let tableHead = `
    <thead id="table-head" class="thead-dark"><tr><th scope="col">Platzierung</th><th scope="col"><div class="trainer-header">Gesammtscore Trainer<img id="total" class="filter-button clickable" src="./resources/svg/filter.svg"></div></th>`;
    component.config.datastore_names.forEach((key, index) => {
      tableHead += `<th scope="col"><div class="trainer-header">${key}<img id="${component.config.datastore_datasets[index]}" class="filter-button clickable" src="./resources/svg/filter.svg"></div></th>`;
    });
    tableHead += `</tr></thead><tbody id="table-body"></tbody>`;
    document.querySelector("#table-students").innerHTML = tableHead;
    document.querySelectorAll(".filter-button").forEach((element) => {
      element.addEventListener("click", () => {
        changeFilter(element.id);
      });
    });
    // Creationg of the Table Body
    let pseudo = 1;
    for (const [key, value] of Object.entries(component.userdata)) {
      component.userdata[key]["rank"] = pseudo++;
      const tag = key == component.user ? " (" + component.user + ")" : "";
      let userTable = `<tr><td class="table-rank">${
        component.userdata[key].rank + tag
      }</td><td class="trainer">${
        component.userdata[key]["trainer"].databaseScore
      }</td><td class="trainer">${
        component.userdata[key]["trainer"]["mc-results"].databaseScore
      }</td><td class="trainer">${
        component.userdata[key]["trainer"]["er_trainer"].databaseScore
      }</td><td class="trainer">${
        component.userdata[key]["trainer"]["er_rel_trainer"].databaseScore
      }</td><td class="praktomat">${
        component.userdata[key]["praktomat"].databaseScore
      }</td><td class="db_access">${
        component.userdata[key]["db_access"].databaseScore
      }</td>`;
      userTable += `</tr>`;
      const tableElement = helper.htmlToElement(userTable);
      document.querySelector("#table-body").appendChild(tableElement);

      // Checks for different Kriteria types

      if (key == component.user) {
        tableElement.classList.add("own-element");
        tableElement.addEventListener("click", () => {
          component.events.openModal();
        });
      }

      let crit1All = true;
      for (const [key2, value2] of Object.entries(component.highscores)) {
        if (value[key2].databaseScore >= component.highscores[key2].score) {
          value[key2].passed_one = true;
          for (const child of tableElement.children) {
            if (child.classList.contains(key2)) {
              child.classList.add("crit-one");
            }
          }
        } else {
          crit1All = false;
        }
      }
      if (crit1All) {
        tableElement.classList.add("crit-one");
        value.passed_one = true;
      }

      if (
        value["trainer"]["er_rel_trainer"].databaseScore >=
          component.totalcrit["trainer"].score &&
        value["trainer"]["er_trainer"].databaseScore >=
          component.totalcrit["trainer"].score &&
        value["trainer"]["mc-results"].databaseScore >=
          component.totalcrit["trainer"].score &&
        value["db_access"].databaseScore >=
          component.totalcrit["db_access"].score &&
        value["praktomat"].databaseScore >=
          component.totalcrit["praktomat"].score
      ) {
        tableElement.classList.add("crit-two");
        for (const child of tableElement.children) {
          child.classList.add("crit-two");
        }
        value.passed_two = true;
      }
    }
  })();

  // Calculation of the Data for the Graph
  let calculateGraphData = () => {
    const data = component.userdata[component.user];
    component.graph.keyArray = [];
    component.graph.rightArray = [];
    component.graph.wrongArray = [];

    let constructObj = (value) => {
      return {
        y: value,
        borderColor: "#000000",
        borderWidth: "3px",
      };
    };

    // Calculation of the MC-Data
    for (const [key, value] of Object.entries(component.mcKeyMap)) {
      if (data["trainer"]["mc-results"].hasOwnProperty(key)) {
        component.graph.keyArray.push("MC-Trainer " + value);
        let totalRight = 0;
        let totalWrong = 0;
        data["trainer"]["mc-results"][key].runs.forEach((element) => {
          totalRight += element.correctBonus;
          totalWrong += 5 - element.correctBonus;
        });
        if (
          data["trainer"]["mc-results"][key].runs.length >=
          component.grading.mc.bonus_border
        ) {
          component.graph.rightArray.push(constructObj(totalRight));
          component.graph.wrongArray.push(constructObj(totalWrong));
        } else {
          component.graph.rightArray.push(totalRight);
          component.graph.wrongArray.push(totalWrong);
        }
      }
    }

    // Calculation of the ER-Data
    if (data["trainer"]["er_trainer"].hasOwnProperty("runs")) {
      component.graph.keyArray.push("ER-Trainer");
      let totalRight = 0;
      let totalWrong = 0;
      data["trainer"]["er_trainer"].runs.forEach((element) => {
        element.correct ? (totalRight += 1) : (totalWrong += 1);
      });
      if (
        data["trainer"]["er_trainer"].runs.length >=
        component.grading.er.bonus_border
      ) {
        component.graph.rightArray.push(constructObj(totalRight));
        component.graph.wrongArray.push(constructObj(totalWrong));
      } else {
        component.graph.rightArray.push(totalRight);
        component.graph.wrongArray.push(totalWrong);
      }
    }

    // Calculation of the ER-REL-Data
    if (data["trainer"]["er_rel_trainer"].hasOwnProperty("runs")) {
      component.graph.keyArray.push("ER-REL-Trainer");
      let totalRight = 0;
      let totalWrong = 0;
      data["trainer"]["er_rel_trainer"].runs.forEach((element) => {
        element.correct ? (totalRight += 1) : (totalWrong += 1);
      });
      if (
        data["trainer"]["er_rel_trainer"].runs.length >=
        component.grading.er.bonus_border
      ) {
        component.graph.rightArray.push(constructObj(totalRight));
        component.graph.wrongArray.push(constructObj(totalWrong));
      } else {
        component.graph.rightArray.push(totalRight);
        component.graph.wrongArray.push(totalWrong);
      }
    }

    // Calculation of the Praktomat Data
    if (data["praktomat"].hasOwnProperty("tasks")) {
      component.graph.keyArray.push("Praktomat");
      let totalRight = 0;
      let totalWrong = 0;
      Object.entries(data["praktomat"].tasks).forEach(() => {
        totalRight += 1;
      });
      component.graph.rightArray.push(totalRight);
      component.graph.wrongArray.push(totalWrong);
    }
  };

  //Function to add construct the final List of passed Students
  (calculateBonusList) => {
    console.log(component.userdata);
    let finalList = [];
    for (const [key, value] of Object.entries(component.userdata)) {
      if (value.passed_one || value.passed_two) {
        finalList.push([key, "JA"]);
      } else {
        finalList.push([key, "NEIN"]);
      }
    }
    console.log(finalList);
  };
})();
