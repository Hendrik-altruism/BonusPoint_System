/**
 * @overview data-based resources of ccmjs-based web component for user authentication
 * @author André Kless <andre.kless@h-brs.de> 2019-2021
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  "guest": {
    "store": "guest-user",
    "title": "Guest Mode: Please enter any username",
    "url": "https://ccm2.inf.h-brs.de"
  },

  /** one-time pseudonym configuration */
  "pseudo": {
    "realm": "guest",
    "guest": true
  },

  /** cloud mode configuration */
  "cloud": {
    "realm": "cloud",
    "store": "dms-user",
    "url": "https://ccm2.inf.h-brs.de",
    "title": "Please enter Username and Password",
    "hash": [ "ccm.load", "https://eild-nrw.github.io/er_rel_trainer/versions/latest/libs/md5/md5.min.mjs" ]
  },

  /** configuration for login with a Hochschule Bonn-Rhein-Sieg FB02 Computer Science account */
  "hbrsinfkaul": {
    "realm": "hbrsinfkaul"
  },

  /** configuration for pseudonym mode of login with a Hochschule Bonn-Rhein-Sieg FB02 Computer Science account */
  "hbrsinfpseudo": {
    "realm": "hbrsinfpseudo"
  },

  /** compact mode for guest configuration */
  "compact": {
    "title": "Guest Mode: Please enter any username",
    "html.logged_in": {
      "id": "logged_in",
      "class": "row",
      "style": "float:none",
      "inner": {
        "id": "button",
        "class": "btn btn-default",
        "inner": [
          {
            "tag": "span",
            "id": "user",
            "inner": [
              { "class": "glyphicon glyphicon-user" },
              "%user%&#8196;"
            ]
          },
          {
            "tag": "span",
            "class": "glyphicon glyphicon-log-out",
          },
          "Logout"
        ],
        "onclick": "%click%"
      }
    },
    "html.logged_out": {
      "id": "logged_out",
      "style": "float:none",
      "inner": {
        "id": "button",
        "class": "btn btn-default",
        "inner": [
          {
            "tag": "span",
            "class": "glyphicon glyphicon-log-in"
          },
          "Login"
        ],
        "onclick": "%click%"
      }
    }
  },

  /** HTML templates */
  "html": {
    "logged_in": {
      "id": "logged_in",
      "class": "well well-sm",
      "inner": [
        {
          "id": "user",
          "inner": [
            { "class": "glyphicon glyphicon-user" },
            "%user%"
          ]
        },
        {
          "id": "button",
          "class": "btn btn-default btn-xs",
          "inner": [
            {
              "tag": "span",
              "class": "glyphicon glyphicon-log-out"
            },
            "Logout"
          ],
          "onclick": "%click%"
        }
      ]
    },
    "logged_out": {
      "id": "logged_out",
      "class": "well well-sm",
      "inner": {
        "id": "button",
        "class": "btn btn-default btn-xs",
        "inner": [
          {
            "tag": "span",
            "class": "glyphicon glyphicon-log-in"
          },
          "Login"
        ],
        "onclick": "%click%"
      }
    },
    "login": {
      "id": "login-form",
      "class": "container",
      "inner": [
        {
          "id": "loginbox",
          "class": "mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2",
          "inner": {
            "class": "panel panel-info",
            "inner": [
              {
                "class": "panel-heading",
                "inner": {
                  "class": "panel-title",
                  "inner": "%title%"
                }
              },
              {
                "class": "panel-body",
                "inner": [
                  {
                    "tag": "form",
                    "id": "loginform",
                    "class": "form-horizontal",
                    "role": "form",
                    "onsubmit": "%login%",
                    "inner": [
                      {
                        "id": "username-entry",
                        "class": "input-group",
                        "inner": [
                          {
                            "tag": "span",
                            "class": "input-group-addon",
                            "inner": {
                              "tag": "i",
                              "class": "glyphicon glyphicon-user"
                            }
                          },
                          {
                            "tag": "input",
                            "id": "login-username",
                            "type": "text",
                            "class": "form-control",
                            "name": "user",
                            "placeholder": "username",
                            "required": true
                          }
                        ]
                      },
                      {
                        "id": "password-entry",
                        "class": "input-group",
                        "inner": [
                          {
                            "tag": "span",
                            "class": "input-group-addon",
                            "inner": {
                              "tag": "i",
                              "class": "glyphicon glyphicon-lock"
                            }
                          },
                          {
                            "tag": "input",
                            "id": "login-password",
                            "type": "password",
                            "class": "form-control",
                            "name": "token",
                            "placeholder": "password",
                            "required": true
                          }
                        ]
                      },
                      {
                        "class": "form-group",
                        "inner": {
                          "class": "col-sm-12 controls",
                          "inner": [
                            {
                              "tag": "input",
                              "type": "submit",
                              "id": "btn-login",
                              "class": "btn btn-success",
                              "value": "Login"
                            },
                            {
                              "tag": "a",
                              "id": "btn-abort",
                              "class": "btn btn-warning",
                              "onclick": "%abort%",
                              "inner": "Abort"
                            }
                          ]
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }
      ]
    }
  }

};