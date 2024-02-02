//import * as Highcharts from "./highcharts.js";

export function generateGraph(component) {
  let stack = "normal";
  let yText = "Durchläufe Total";
  if (component.graph.setting) {
    stack = "percent";
    yText = "Durchläufe in Prozent";
  }

  Highcharts.chart("graph1", {
    chart: {
      type: "column",
    },
    title: {
      text: "", // Maybe fill in later
    },
    xAxis: {
      categories: component.graph.keyArray,
      labels: {},
    },
    yAxis: {
      min: 0,
      title: {
        text: `${yText}`,
      },
    },
    tooltip: {
      pointFormat:
        '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
      shared: true,
    },
    plotOptions: {
      column: {
        stacking: `${stack}`,
        events: {
          click: function (oEvent) {
            window.open(component.trainerLinks[oEvent.point.x]);
          },
        },
        dataLabels: {
          enabled: true,
          verticalAlign: "top",
        },
      },
    },
    series: [
      {
        name: "Falsch beantwortet",
        data: component.graph.wrongArray,
        color: "red",
      },
      {
        name: "Richtig beantwortet",
        data: component.graph.rightArray,
        color: "green",
      },
      {
        name: "Bonuspunkte erhalten",
        data: [],
        color: "black",
      },
    ],
  });
}
