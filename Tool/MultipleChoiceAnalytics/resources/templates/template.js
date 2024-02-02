import { html, render } from "../../libs/lit/lit.js";
export { render };

export function template(component) {
  return html`
    <!--Html for the Document Body-->
    <div class="content-wrapper">
      <div class="nav-Bar">
        <h1>${component.name}</h1>
        <button
          type="button"
          class="btn btn-info score"
          @click="${component.events.openInfoModal}"
        >
          Wie funktioniert das Bonuspunkte-System?
        </button>
      </div>
      <div id="login"></div>
      <div id="list-students">
        <div class="legende">
          <div class="legende-container">
            <div class="legende-box" id="own-legend"></div>
            <p>Eigener Score</p>
          </div>
          <div class="legende-container">
            <div class="legende-box" id="crit1-legend"></div>
            <p>
              Bestanden nach Kriterium 1 (Trainer: ${component.highscores.trainer.score}, Praktomat: ${component.highscores.praktomat.score}, Datenbank Zugriffe: ${component.highscores.db_access.score})
            </p>
          </div>
          <div class="legende-container">
            <div class="legende-box" id="crit2-legend"></div>
            <p>
              Bestanden nach Kriterium 2
            </p>
          </div>
        </div>
        <table class="table" id="table-students"></table>
      </div>

      <!--Place of the Modal-Dialog-->
      <div id="modal-box">
        <!--Html for the Info Modal generation-->
        <div
          class="modal fade"
          id="info-Modal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="infoModal"
          aria-hidden="true"
          style="display: none"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Bonus-Punkte Konzept</h4>

                <img
                  class="close-svg clickable"
                  src="./resources/svg/close.svg"
                  @click="${component.events.closeInfoModal}"
                />
              </div>
              <div class="modal-body">
                <h5>Welche Belohnung erhält man?</h5>
                <p>
                  Wenn man nach einem Kriterium bestanden hat, erhält man einen
                  Notenbonus der Endnote im Fach Datenbanken von einem
                  Notenpunkt -> Die Note wird um eine Stufe verbessert.
                </p>
                <h5>Wie bekommt man den Bonus?</h5>
                <p>
                  Es gibt 3 verschiedene Scores, in denen eine gewisse Grenze erreicht werden muss, um den Bonus zu erhalten:
                  <br /><br />
                  Trainer-Scores: Der Trainer-Gesammtscore berechnet sich aus den Teilpunkten, die man durch die Verwendung der datenbankinternen Trainer erhält.
                  <br /><br />
                  Praktomat Übungen: Für eine richtig abgegebene Übung im Praktomat erhält man einen Punkt. Es gibt hier also maximal 9 Punkte zu erreichen.
                  <br /><br />
                  Datenbank Zugriffe: Es gibt einen Punkt, wenn man sich zu 3 verschiedenen Zeiträumen bei der Datenbank angemeldet hat und mindestens 1 eigene Tabelle, sowie 1 Tabelle in der Übungsdatenbank erstellt hat.
                  <br /><br />
                  Zum Bestehen existieren 2 Kriterien, von denen nur EINS erfüllt werden muss!
                </p>
                <h5>Kriterium 1</h5>
                <p>
                  Pro Score gibt es jeweils 1 Kriterium (Kriterium 1), welches erreicht werden muss und variabel für jeden Score berrechnet wird. Die Formel lautet wie folgt: 
                  <br /><br />
                  Kriterium 1 (flexibel): Man hat 75% der Punkte, des
                  Durchschnitts der ersten 10% der Nutzer erreicht.
                  <br /><br />
                  Bei der Berechnung werden Ausreißer allerdings nicht miteinbezogen, um den Durchschnitt nicht zu verfälschen. Die aktuellen Werte lauten wie folgt: Trainer (${component.highscores.trainer.score}), Praktomat (${component.highscores.praktomat.score}), Datenbank Zugriffe (${component.highscores.db_access.score})
                </p>
                <h5>Kriterium 2</h5>
                <p>
                  Es existiert noch ein festgelegtes Kriterium, welches das Bestehen auf jedenfall garantiert und unabhängig von den Leistungen der anderen Nutzer ist:
                  <br /><br />
                  Kriterium 2 (hart): Man erreicht pro Trainer eine Punktzahl von mindestens ${component.totalcrit.trainer.score}, hat mindestens ${component.totalcrit.praktomat.score} erfolgreiche Übungsabgaben und erhält ${component.totalcrit.db_access.score} Punkt durch die Datenbank Zugriffe.
                </p>
                <p class="alert">
                  Da das System neu und noch in Bearbeitung ist, können sich die
                  Kriterien, sowie die Bepunktung während des Semesters ändern!
                  <br /><br />
                  Die Daten für die Praktomat Übungen und Datenbank Zugriffe werden noch nicht in Echtzeit eingetragen, sondern einmal pro Woche aktualisiert!
                </p>
              </div>
              <div class="modal-footer">
                <h5>Punkte Tabelle der Trainer</h5>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Tools</th>
                      <th scope="col">Multiple Choice (13)</th>
                      <th scope="col">ER-(REL)-Trainer</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Punkte Pro Lauf</th>
                      <td>1</td>
                      <td>2</td>
                    </tr>
                    <tr>
                      <th scope="row">Bonus Punkte</th>
                      <td>Je 10</td>
                      <td>Je 60</td>
                    </tr>
                    <tr>
                      <th scope="row">Bonus Grenze</th>
                      <td>Je ab 10 Durchläufen</td>
                      <td>Je ab 30 Durchläufen</td>
                    </tr>
                    <tr>
                      <th scope="row">Gesammte Punkte durch Bonus</th>
                      <td>20 pro Trainer (260)</td>
                      <td>120 ER + 120 REL (240)</td>
                    </tr>
                  </tbody>
                </table>
                <br />
              </div>
            </div>
          </div>
        </div>

        <!--Html for the Student Modal generation-->

        <div
          class="modal fade"
          id="student-Modal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="student-Modal"
          aria-hidden="true"
          style="display: none"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Trainer Ergebnisse</h4>
                <img
                  class="close-svg clickable"
                  src="./resources/svg/close.svg"
                  @click="${component.events.closeModal}"
                />
              </div>
              <div class="modal-body body-student">
                <div id="graph1"></div>
              </div>
              <div class="modal-footer">
              <button class="btn btn-primary" id="switchGraphMode" @click="${component.events.toggleGraphSetting}">Prozent</button>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--Imported Scripts and Stylesheets-->
      <link rel="stylesheet" href="./libs/bootstrap/bootstrap.min.css" />
      <script src="./libs/bootstrap/bootstrap.min.js"></script>
      <link rel="stylesheet" href="./resources/styles/style.css" />
    </div>
  `;
}

export function spinner() {
  return html`
    <div class="spinner-container">
      <p><b>Lade Daten...<b></p>
      <div class="spinner-border" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
    <link rel="stylesheet" href="./libs/bootstrap/bootstrap.min.css" />
    <script src="./libs/bootstrap/bootstrap.min.js"></script>
    <link rel="stylesheet" href="./resources/styles/style.css" />
  `;
}

export function loader() {
  return html`
    <div class="spinner-container">
      <p><b>Lade Daten...<b></p>
      <div class="loading-container">
          <div class="loading-object">
          </div>
        </div>
    </div>
    <link rel="stylesheet" href="./libs/bootstrap/bootstrap.min.css" />
    <script src="./libs/bootstrap/bootstrap.min.js"></script>
    <link rel="stylesheet" href="./resources/styles/style.css" />
  `;
}
