 /** Escribe en la consola si estamos desarrollando
 ****************************************************************************************************************************** 
 */
function msgLog(obj) {
    if (en_desarrollo) {
      console.log(obj);
      //alert(obj);
    };
};

/** Recupero la URL de un item del array de datos_pers 
****************************************************************************************************************************** */
function get_datos_pers(datos_pers, literal) {
    retVal = undefined;
    for (i in datos_pers) {
      if (datos_pers[i].literal === literal) {
        if (datos_pers[i].url) {
          retVal = datos_pers[i].url;
        } else {
          retVal = datos_pers[i].valor;
        }
        break;
      }
    };

    return retVal;
};

 /** Pinta tabla con los datos personales
 ****************************************************************************************************************************** 
 * Pinto tabla a dos columnas (4 con los títulos).
 */
function pinta_datos_pers_tabla(arraydatos, id_dom) {
    var id_jquery = $(id_dom); // Convertimos a JQuery
    var shtml = "";
    id_jquery.html(shtml);
    // Pinto cada uno de los elementos del array
    arraydatos.forEach(function(elem,i) {

      if (elem.valor || elem.url) {
        // Par: abre fila
        if (i % 2 === 0 || i === 0) {
          shtml = "<tr>";
        }
        shtml = shtml + "<th>";
        if (elem.icono) {
          shtml = shtml + "<img src='" + elem.icono + "' height='25' border='0' alt='' title='" + ((elem.titulo) ? elem.titulo : elem.literal) + "'>";
        } else {
          shtml = shtml + elem.literal;
        };
        shtml = shtml + "</th><td>";
        if (elem.valor) {
          if (elem.url) {
            shtml = shtml + "<a href='" + elem.url + "'>" + elem.valor + "</a>";
          } else {
            shtml = shtml + elem.valor;
          };
        } else {
          shtml = shtml + "<a href='" + elem.url + "'>" + elem.url + "</a>";
        };
        shtml = shtml + "</td>";
        // Impar o último: cierro fila e inserto
        if (i % 2 !== 0 || i === arraydatos.length - 1) {
          shtml = shtml + "</tr>";
          id_jquery.append(shtml);
          shtml = "";
        };
      } 

    });
    
};

/** Pinta iconos de los datos personales
 ****************************************************************************************************************************** 
 * Pinto solo los que tengan Icono y Url.
 */
function pinta_datos_pers_iconos(arraydatos, id_dom) {
    var id_jquery = $(id_dom); // Convertimos a JQuery

    // Pinto cada uno de los elementos del array
    arraydatos.forEach(function(elem,i) {
      var shtml = "";

      if (elem.icono && elem.url) {
        // Icono solo (con enlace y hint si hay)
        shtml = "<div class='datos_pers'>";
        shtml = shtml + "<a href='" + elem.url + "'><img src='" + elem.icono + "' height='45' border='0' alt='' ";
        shtml = shtml + "title='" + ((elem.titulo) ? elem.titulo : elem.literal) + "'"; 
        shtml = shtml + "></a>";
        shtml = shtml + "</div>";
        // Añadimos el HTML
        id_jquery.append(shtml);
      } 
    });
    
};

/* Extracto 
****************************************************************************************************************************** */
function pinta_extracto(cvdat, id_dom, vers_print) {
    var id_jquery = $(id_dom); // Convertimos a JQuery
    var shtml = "";
    id_jquery.html(" "); // Limpiamos el HTML

    if (vers_print) {
      shtml = shtml + "<div class='pr_text_center'>";
      shtml = shtml + "<h3>" + cvdat.titulo + "</h3>";
      shtml = shtml + "</div>";
      // Foto a la izquierda y extracto a la derecha
      shtml = shtml + "<div id='div_foto_cara' class=' pr_float_left '> "
      shtml = shtml + "  <img src='" + data_folder + cvdat.config.foto_cara + "' alt='' class='img-circle fotocara'> "
      shtml = shtml + "</div>"
      shtml = shtml + "<div id='extracto'>";
      cvdat.extracto.forEach(function(elem,i) {
        shtml = shtml + " <p>" + elem + "</p>"
      });
      shtml = shtml + "</div>"
    } else {
      // Extracto
      shtml = shtml + "<div id='extracto' class=' col-xs-12 col-sm-12 col-md-7 col-lg-7 '>";
      shtml = shtml + "<h1>" + cvdat.nombre + "</h1>"
      shtml = shtml + "<h3>" + cvdat.titulo + "</h3>";
      cvdat.extracto.forEach(function(elem,i) {
        shtml = shtml + " <p>" + elem + "</p>"
      });
      shtml = shtml + "</div>";
      // Foto a la derecha
      shtml = shtml + "<div id='div_foto_cara' class=' col-xs-12 col-sm-12 col-md-4 col-lg-4 col-md-offset-1 col-lg-offset-1 '> "
      shtml = shtml + "  <img src='" + data_folder + cvdat.config.foto_cara + "' alt='' class='img-circle fotocara'> "
      shtml = shtml + "</div>"
    };
        
    // Añadimos el HTML
    id_jquery.append(shtml);
};


/* Competencias 
****************************************************************************************************************************** */
function pinta_competencias(arrayconfig, arrayelem, id_dom, vers_print) {
	var id_jquery = $(id_dom); // Convertimos a JQuery
   id_jquery.html(""); // Limpiamos el HTML	
	
	arrayconfig.forEach(function(elem,i) { // Recorro los tipos de competencia
		var shtml = "";
		
		// Inicio el div principal
		shtml = shtml + "<div class='container no_page_break'>"; 
		
		// Título de la competencia:		
		shtml = shtml + "<div class='pr_text_center'><h3>" + elem.descripcion; 
		if (elem.leyenda) {
			shtml = shtml + " <small><sup>{" + elem.leyenda + "}</sup></small>";
		};
		shtml = shtml + "</h3></div>";
		
		// Cuerpo de la competencia
		shtml = shtml + "<div>";	
		if (vers_print) {
			if (elem.formato === "largo") {
				shtml = shtml + pinta_comp_1col(arrayelem, elem.tipo);
			} else {
				shtml = shtml + pinta_comp_2col(arrayelem, elem.tipo);
			};		
		} else {			
      if (elem.formato === "largo") {
        shtml = shtml + pinta_comp_panel_largo(arrayelem, elem.tipo);
      } else {
        shtml = shtml + pinta_comp_panel_corto(arrayelem, elem.tipo);
      };    
		};			
		shtml = shtml + "</div>";
		
		// Termino el div principal
		shtml = shtml + "</div>"; 	
		
		id_jquery.append(shtml);
	});
	
};

function pinta_comp_1col(arrayelem, tipo_comp) {
  var shtml = "";

   arrayelem.forEach(function(elem,i) {
      
      if (elem.tipo === tipo_comp) {
       // Texto normal; título de la competencia en negrita
       shtml = shtml + "<p><strong>&bull; " + elem.competencia + "<sup> (" + elem.nivel + ")</sup>: </strong>";
       if (elem.descripcion && elem.descripcion.length > 0) {
        shtml = shtml + " " + elem.descripcion + "." ;
       };
       if (elem.tareas && elem.tareas.length > 0) {
        shtml = shtml + " (<small>" + elem.tareas.join("; ") + "</small>).";         
       };
       shtml = shtml + "</p>";
      }      
   });
   
   return shtml;

};

function pinta_comp_2col(arrayelem, tipo_comp) {
    var shtml = "";
    shtml = shtml + "<table><tbody>"; // Abro la tabla

    arrayelem.forEach(function(elem,i) {
      
        if (elem.tipo === tipo_comp) {

            if (i % 2 === 0) {
                shtml = shtml + "<tr>"; // Nueva fila
                // 1a columna
                shtml = shtml + "<td><strong>&bull; " + elem.competencia + "<sup> (" + elem.nivel + ")</sup></strong>: " + elem.descripcion + "</td>";
                // Si hay mas elementos, pinto la 2a columna:
                if (i < arrayelem.length - 1) {
                   shtml = shtml + "<td><strong>&bull; " + arrayelem[i + 1].competencia + "<sup> (" + arrayelem[i + 1].nivel + ")</sup></strong>: " + arrayelem[i + 1].descripcion + "</td>";
                }
                shtml = shtml + "</tr>"; // termino la fila
            };
        };      
    });
   
    shtml = shtml + "</tbody></table>"; // Cierro la tabla
    return shtml;
};

function pinta_comp_panel_largo(arrayelem, tipo_comp) {
    var shtml = "";

    arrayelem.forEach(function(elem,i) {
      
        if (elem.tipo === tipo_comp) {
            // Paneles semánticos de bootstraps
            var estilopanel;
            if (elem.nivel >= 5) {estilopanel='primary'} 
            else if (elem.nivel === 4) {estilopanel='success'}
            else if (elem.nivel === 3) {estilopanel='info'}
            else if (elem.nivel === 2) {estilopanel='warning'}
            else {estilopanel='danger'}
            shtml = shtml + "<div class='panel panel-" + estilopanel + " conocimientos no_page_break'>";
            shtml = shtml + "<div class='panel-heading'>";
            shtml = shtml + "<h3 class='panel-title'>" + elem.competencia + "<sup> (" + elem.nivel + ") </sup></h3>";
            shtml = shtml + "</div>";
            shtml = shtml + "<div class='panel-body'>";
            if (elem.descripcion && elem.descripcion.length > 0) {
              shtml = shtml + elem.descripcion + ".<br>"
            };
            if (elem.tareas && elem.tareas.length > 0) {
              shtml = shtml + "<small>&#9899; " + elem.tareas.join(".<br>&#9899; ") + "." + "</small>";         
            };
            shtml = shtml + "</div>";
            shtml = shtml + "</div>";
        }      
    });
    
    return shtml;
};

function pinta_comp_panel_corto(arrayelem, tipo_comp) {
    var shtml = "";

    arrayelem.forEach(function(elem,i) {
      
        if (elem.tipo === tipo_comp) {
            // Paneles semánticos de bootstraps
            var estilopanel;
            if (elem.nivel >= 5) {estilopanel='primary'} 
            else if (elem.nivel === 4) {estilopanel='success'}
            else if (elem.nivel === 3) {estilopanel='info'}
            else if (elem.nivel === 2) {estilopanel='warning'}
            else {estilopanel='danger'}
            shtml = shtml + "<div class='panel panel-" + estilopanel + " idiomas no_page_break'>";
            shtml = shtml + "<div class='panel-heading'>";
            shtml = shtml + "<h3 class='panel-title'>" + elem.competencia + "<sup> (" + elem.nivel + ") </sup></h3>";
            shtml = shtml + "</div>";
            shtml = shtml + "<div class='panel-body'>";
            if (elem.descripcion && elem.descripcion.length > 0) {
              shtml = shtml + elem.descripcion + ".<br>"
            };
            shtml = shtml + "</div>";
            shtml = shtml + "</div>";
        }      
    });
    
    return shtml;
};

/* Otras competencias 
****************************************************************************************************************************** */
function pinta_otrascomp(arrayelem, id_dom, vers_print) {
    var id_jquery = $(id_dom); // Convertimos a JQuery
    id_jquery.html(" "); // Limpiamos el HTML
    // Recorremos el array
    arrayelem.forEach(function(elem,i) {
       // Añadimos el HTML con el elemento y el siguiente (solo para los pares)
      if (i % 2 === 0) {
        if (i === arrayelem.length - 1) {
          id_jquery.append("<tr><td>" + elem + "</td><td></td></tr>");
        } else {
          id_jquery.append("<tr><td>" + elem + "</td><td>" + arrayelem[i + 1] + "</td></tr>");
        }       
      }
    });
};

/* Experiencia laboral 
****************************************************************************************************************************** */
function pinta_explab(arrayelem, id_dom, vers_print, config) {
    var id_jquery = $(id_dom); // Convertimos a JQuery
    id_jquery.html(""); // Limpiamos el HTML
    // Recorremos el array
    arrayelem.forEach(function(elem,i) {

      var shtml = "";
      if (vers_print) {
        shtml = shtml + "<div class='prn_workDetails'>";
        // Logo o Nombre empresa + Cargo
        shtml = shtml + "<div class='prn_workDivLogo'>";
        if (elem.enlace) {shtml = shtml + "<a href='" + elem.enlace + "'>"} 
        if (elem.logo) {
          shtml = shtml + "<img src='" + data_folder + elem.logo + "' height='30mm' max-width='50mm'>"
        } else {
          shtml = shtml + "<span class='prn_workEmpresa'>" + elem.empresa + " </span>"
        }
        if (elem.enlace) {shtml = shtml + "</a>"};   
        shtml = shtml + "<span class='prn_workCargo'> " + elem.cargo + "</span>";
        shtml = shtml + "</div>";
        shtml = shtml + "<p>" + elem.desde + " - " + elem.hasta + "</p>";
        shtml = shtml + "<p>&bull; " + elem.funciones.join("<br>&bull; ") + "</p>";

        // Logros
        if (config.prn_mostrar_logros && elem.logros) {
          if (config.mostrar_logros_firts || i > 0) {
            if (elem.logros.length > 0) {
              shtml = shtml + "<h4>Logros</h4>";
              shtml = shtml + "<p><small>&bull; " + elem.logros.join("<br>&bull; ") + "</small></p>";
            }
          }
        }
        
        shtml = shtml + "</div>";
        
        // Añadimos el HTML
        id_jquery.append(shtml);
      } else {

        shtml = shtml + "<div class='row workDetails'>";
        shtml = shtml + "<div class='col-xs-12 col-sm-3 col-md-2 col-lg-2'>";
        shtml = shtml + "<div class='workYear pr_text_center'>" + elem.desde + "<br>" + elem.hasta + "</div>";
        shtml = shtml + "</div>";
        shtml = shtml + "<div class='col-xs-12 col-sm-9 col-md-10 col-lg-10 rightArea'>";
        shtml = shtml + "<div class='arrowpart'></div>";
        shtml = shtml + "<div class='exCon'>";
        shtml = shtml + "<h4>" 
        if (elem.enlace) {shtml = shtml + "<a href='" + elem.enlace + "'>"} 
        if (elem.logo) {
          shtml = shtml + "<img src='" + data_folder + elem.logo + "' height='45'>"
        } else {
          shtml = shtml + elem.empresa
        }
        if (elem.enlace) {shtml = shtml + "</a>"}   
        shtml = shtml + "</h4>" 
        shtml = shtml + "<h5>" + elem.cargo + "</h5>";
        shtml = shtml + "<p>&#9899 " + elem.funciones.join("<br>&#9899 ") + "</p>";

        // Logros
        if (config.mostrar_logros && elem.logros) {
          if (config.mostrar_logros_firts || i > 0) {
            if (elem.logros.length > 0) {
              var id_div_logros = "explab_logros_div" + i;
              var id_h5_logros = "explab_logros_h5" + i;
              shtml = shtml + "<h5 style='cursor:pointer' id='" + id_h5_logros + "'>" + "Logros " + "<span class='glyphicon glyphicon-plus'></span></h5>";
              shtml = shtml + "<div id='" + id_div_logros + "'>";
              shtml = shtml + "<small>&#9899 " + elem.logros.join("<br>&#9899 ") + "</small>";
              shtml = shtml + "</div>";
            }
          }
        }

        // Referencias
        if (config.mostrar_referencias && elem.referencias) {
          if (config.mostrar_referencias_firts || i > 0) {
            if (elem.referencias.length > 0) {
              var id_div_ref = "explab_ref_div" + i;
              var id_h5_ref = "explab_ref_h5" + i;
              shtml = shtml + "<h5 style='cursor:pointer' id='" + id_h5_ref + "'>" + "Referencias " + "<span class='glyphicon glyphicon-plus'></span></h5>";
              shtml = shtml + "<div id='" + id_div_ref + "'>";
              shtml = shtml + "<table class='table'>";
              for (var iRef = 0; iRef < elem.referencias.length; iRef++) {
                var curRef = elem.referencias[iRef];
                shtml = shtml + "<tr><td><small><a href='" + curRef.url + "'>" + curRef.nombre + "</small></td><td><small>" + curRef.cargo + "</small></td>";
              };                   
              shtml = shtml + "</table></div>";
            }
          }
        }

        shtml = shtml + "</div>";
        shtml = shtml + "</div>";
        shtml = shtml + "</div>";

        // Añadimos el HTML
        id_jquery.append(shtml);

        // Añadimos evento de clik a 'logros':
        if (config.mostrar_logros && id_h5_logros) {
          var logro_h5 = $("#" + id_h5_logros);
          var logro_div = $("#" + id_div_logros);
          logro_h5.click(
            function() {
              if (elem.logro_visible) {
                logro_div.slideUp(500, function(){logro_h5.html("Logros <span class='glyphicon glyphicon-plus'></span>"); });
                elem.logro_visible = 0;
              } else {
                logro_div.slideDown(500, function(){logro_h5.html("Logros <span class='glyphicon glyphicon-minus'></span>"); }); // Pongo el icono de menos
                elem.logro_visible = 1;
              }
            }
          );
          // escondo el div logros
          logro_div.hide()
        };

        // Añadimos evento de clik a 'referencias':
        if (config.mostrar_referencias && id_h5_ref) {
          var ref_h5 = $("#" + id_h5_ref);
          var ref_div = $("#" + id_div_ref);
          ref_h5.click(
            function() {
              if (elem.ref_visible) {
                ref_div.slideUp(500, function(){ref_h5.html("Referencias <span class='glyphicon glyphicon-plus'></span>"); });
                elem.ref_visible = 0;
              } else {
                ref_div.slideDown(500, function(){ref_h5.html("Referencias <span class='glyphicon glyphicon-minus'></span>"); }); // Pongo el icono de menos
                elem.ref_visible = 1;
                // ref_h5.html("Referencias <span class='glyphicon glyphicon-minus'></span>"); 
              }
              
            }
          );
          // escondo el div referencias
          ref_div.hide()
        };
      }; // vers_print

    }); // forEach ...

};

/* Estudios 
****************************************************************************************************************************** */
function pinta_estudios(arrayelem, id_dom, vers_print) {
    var id_jquery = $(id_dom); // Convertimos a JQuery
    id_jquery.html(""); // Limpiamos el HTML
    // Recorremos el array
    arrayelem.forEach(function(elem,i) {
      var shtml = "";
      if (vers_print) {
        shtml = shtml + "<div class='pr_estudios'>";
        shtml = shtml + "<p class='pr_tit_estudios'>&bull; " + elem.titulo + " <small>(" + elem.desde + " - " + elem.hasta + ")</small></p>";        
        shtml = shtml + "<h4>" + elem.centro + "</h4>";
        shtml = shtml + "<p>" + elem.descripcion.join("<br>") + "</p>";
        shtml = shtml + "</div>";
      } else {
        shtml = shtml + "<div class='row workDetails'>";
        shtml = shtml + "<div class='col-xs-12 col-sm-3 col-md-2 col-lg-2'>";
        shtml = shtml + "<div class='workYear'>" + elem.desde + "<br>" + elem.hasta + "</div>";
        shtml = shtml + "</div>";
        shtml = shtml + "<div class='col-xs-12 col-sm-9 col-md-10 col-lg-10 rightArea'>";
        shtml = shtml + "<div class='arrowpart'></div>";
        shtml = shtml + "<div class='exCon'>";
        shtml = shtml + "<h4>" + elem.titulo + "</h4>";
        shtml = shtml + "<h5>" + elem.centro + "</h5>";
        shtml = shtml + "<p>" + elem.descripcion.join("<br>") + "</p>";
        shtml = shtml + "</div>";
        shtml = shtml + "</div>";
        shtml = shtml + "</div>";
      };
      // Añadimos el HTML
      id_jquery.append(shtml);

    });
};

/* Formaciones 
****************************************************************************************************************************** */
function pinta_formaciones(arrayconfig, arrayelem, id_dom, vers_print) {
  var id_jquery = $(id_dom); // Convertimos a JQuery
   id_jquery.html(""); // Limpiamos el HTML 
  
  arrayconfig.forEach(function(elem,i) { // Recorro los tipos de formación
    var shtml = "";
    
    // Inicio el div contenedor del grupo actual
    shtml = shtml + "<div class='container no_page_break'>"; 
    
    // Título del grupo:    
    shtml = shtml + "<div class='text_center'><h3>" + elem.descripcion; 
    shtml = shtml + "</h3></div>";
    
    // Cuerpo delgrupo
    shtml = shtml + "<div>";  
    if (vers_print) {
      shtml = shtml + pinta_for_tabla(arrayelem, elem.tipo);
    } else {      
      if (elem.formato === "vistoso") {
        shtml = shtml + pinta_for_vistoso(arrayelem, elem.tipo);
      } else {
        shtml = shtml + pinta_for_tabla(arrayelem, elem.tipo);
      };    
    };      
    shtml = shtml + "</div>";
    
    // Termino el div principal
    shtml = shtml + "</div>";   
    
    id_jquery.append(shtml);
  });
  
};

function pinta_for_tabla(arrayelem, tipo_for) {
    var shtml = "";
    shtml = shtml + "<table class='table table-striped'><tbody>";  // Abrimos la tabla
    // Recorremos el array
    arrayelem.forEach(function(elem,i) {
        if (elem.tipo === tipo_for) {
            shtml = shtml + "<tr>"; // Nueva fila
            shtml = shtml + "<td class='for_col_periodo'>" + elem.periodo + "</td>";
            shtml = shtml + "<td>" + elem.descripcion 
            if (elem.centro) {
                shtml = shtml + " (" + elem.centro + ")"
            };
            shtml = shtml + ".</td></tr>"; // termino la fila
        };
    });
    
    shtml = shtml + "</tbody></table>"; // Cerramos la tabla
    return(shtml);
};

function pinta_for_vistoso(arrayelem, tipo_for) {
    var shtml = "";
    // Recorremos el array
    arrayelem.forEach(function(elem,i) {
        if (elem.tipo === tipo_for) {
          shtml = shtml + "<div class='row formDetails'>";
          shtml = shtml + "<div class='col-xs-12 col-sm-3 col-md-2 col-lg-2'>";
          shtml = shtml + "<div class='formYear'>" + elem.periodo + "</div>";
          shtml = shtml + "</div>";
          shtml = shtml + "<div class='col-xs-12 col-sm-9 col-md-10 col-lg-10 rightArea'>";
          shtml = shtml + "<div class='arrowpart'></div>";
          shtml = shtml + "<div class='exCon'>";
          if (elem.url === "") 
            shtml = shtml + "<h5>" + elem.descripcion + "</h5>"
          else
            shtml = shtml + "<h5><a href='" + elem.url + "'>" + elem.descripcion + "</a></h5>";
          shtml = shtml + "<p>" + elem.centro + "</p>";
          shtml = shtml + "</div>";
          shtml = shtml + "</div>";
          shtml = shtml + "</div>";
        };
    });
    
    return(shtml);
};





function xxx(arrayelem, tipo_for) {
    var shtml = "";
    
    if (vers_print) { // Creamos una tabla para imprimir
    };
    // Recorremos el array
    arrayelem.forEach(function(elem,i) {

      if (vers_print) {
         shtml = shtml + "<tr>"; // Nueva fila
         shtml = shtml + "<td>" + elem.anio + "</td>";
         shtml = shtml + "<td>" + elem.descripcion + " (" + elem.centro + ")</td>";
         shtml = shtml + "</tr>"; // termino la fila

      } else {
        shtml = "";
        shtml = shtml + "<div class='row formDetails'>";
        shtml = shtml + "<div class='col-xs-12 col-sm-3 col-md-2 col-lg-2'>";
        shtml = shtml + "<div class='formYear'>" + elem.anio + "</div>";
        shtml = shtml + "</div>";
        shtml = shtml + "<div class='col-xs-12 col-sm-9 col-md-10 col-lg-10 rightArea'>";
        shtml = shtml + "<div class='arrowpart'></div>";
        shtml = shtml + "<div class='exCon'>";
        if (elem.url === "") 
          shtml = shtml + "<h5>" + elem.descripcion + "</h5>"
        else
          shtml = shtml + "<h5><a href='" + elem.url + "'>" + elem.descripcion + "<a></h5>";
        shtml = shtml + "<p>" + elem.centro + "</p>";
        shtml = shtml + "</div>";
        shtml = shtml + "</div>";
        shtml = shtml + "</div>";
        
        // Añadimos el HTML
        id_jquery.append(shtml);
      };
    });
   
   // Añadimos el HTML
    if (vers_print) { 
      shtml = shtml + "</tbody></table>"; // Cerramos la tabla
      id_jquery.append(shtml);
    };
};


/* function Ready 
****************************************************************************************************************************** */
jQuery(function($) {
  $(document).ready( function() {
    var shtml = "";
    //alert("inicio ready");
    msgLog("inicio ready");
    // Leo los datos del CV
    $.getJSON(data_folder +"cv_datos.json", function(cvdat){
    //alert("json leido");
    msgLog("json leido");

    // Vemos si es la versión para imprimir
    var vers_print = $.getURLParam("printversion");
    
    // Cargar librerias y estilos
    if (!vers_print) {
			if (!en_desarrollo) {
				$("#bootstrap_css").attr("href", "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css");
			} else {
				$("#bootstrap_css").attr("href", "lib/bootstrap.css");
			};
      $("#estilo_cv").attr("href", "cv.css");
      if (!en_desarrollo) {
				loadJS("bootstrap", "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js");			
			} else {
				loadJS("bootstrap", "lib/bootstrap.js");			
			};
    } else {
      $("#estilo_cv").attr("href", "cv_print.css");
    };
    msgLog("Cargados librerias y estilos");

    // Bajo e-mail, linkedin y url de datos_pers a la raiz
    cvdat.mailto = get_datos_pers(cvdat.datos_pers, "e-mail");
    cvdat.linkedin = get_datos_pers(cvdat.datos_pers, "LinkedIn");
    cvdat.url = get_datos_pers(cvdat.datos_pers, "Url");

    // Parte superior y título
    if (!vers_print) {
      // Nombre Titulo superior
      shtml = "<img src='" + data_folder + cvdat.config.foto_fondo + "' alt='' width='100%' height='100%'>";
      shtml = shtml + "<div class='carousel-caption'>";
      shtml = shtml + "<h1 class='lletrabanner'>" + cvdat.nombre + "</h1>";
      shtml = shtml + "<h3 class='lletrabanner'>" + cvdat.titulo + "</h3>";
      if (en_desarrollo) {
      	shtml = shtml + "<h4 class='lletrabanner'>(Versión en desarrollo)</h4>";
      };
      shtml = shtml + "<p><br><br></p>";
      shtml = shtml + "<p><a href='" + cvdat.linkedin + "'>";
      shtml = shtml + "<img src='https://static.licdn.com/scds/common/u/img/webpromo/btn_viewmy_160x33_es_ES.png?locale=' width='160' height='33' "
      shtml = shtml + "border='0' alt='Ver el perfil de " + cvdat.nombre + " en LinkedIn'>";
      shtml = shtml + "</a></p>";
      shtml = shtml + "</div>";
      $("#divtit").html(shtml);

    } else {
      // Titulo
      shtml = "CV " + cvdat.nombre;
      $("#tit_acercademi").html(shtml);
    };
    msgLog("Pintado Parte superior y título");

    // Menu
    if (!vers_print) {
      // Menu izquierdo
      $("#navbar-header").append("<a class='navbar-brand' href='cv.html?printversion=1'><img src='recursos/print_black.png' height='30' border='0' title='Ir a la versión para imprimir'></a>");
      // Dos primeros menús
      $("#ul_menus").prepend("<li class='menuItem'><a href='#extracto'>Sobre Mi</a></li>");
      $("#ul_menus").prepend("<li class='menuItem active'><a href='#home'>Inicio</a></li>");
      // último menú
      $("#ul_menus").append("<li class='menuItem'><a href='#contacto'>Contacto</a></li>");
      // Mantiene el menu arriba
      $('.navbar-wrapper').stickUp({
        parts: {
          0: 'home',
          1: 'extracto',
          2: 'competencias',
          3: 'experiencia',
          4: 'estudios',
          5: 'contacto'
        },
        itemClass: 'menuItem',
        itemHover: 'active',
        topMargin: 'auto'
      });
    } else {
      // Menu izquierdo
      $("#navbar-header").append("<a class='navbar-brand' href='cv.html'><img src='recursos/midori-icon.png' height='30' border='0' title='Volver a la versión Web'></a>");
      // Dos primeros menús
      $("#ul_menus").prepend("<li class='menuItem active'><a href='#extracto'>Sobre Mi</a></li>");
      // último menú
      $("#ul_menus").append("<li class='menuItem'><a href='#contacto'>Datos personales</a></li>");
      // Mantiene el menu arriba
      $('.navbar-wrapper').stickUp({
        parts: {
          0: 'extracto',
          1: 'competencias',
          2: 'experiencia',
          3: 'estudios',
          4: 'contacto'
        },
        itemClass: 'menuItem',
        itemHover: 'active',
        topMargin: 'auto'
      });
    };
    msgLog("Pintado Menu");

    // Extracto
    pinta_extracto(cvdat, "#acercademi", vers_print);
    msgLog("Pintado Extracto");

    // Competencias
    pinta_competencias(cvdat.tipos_competencia, cvdat.competencias, "#competenciasdet", vers_print);
    msgLog("Pintado Competencias");
    
    // Otros conocimientos
    pinta_otrascomp(cvdat.otrascomp, "#otrascomp", vers_print);
    msgLog("Pintado Otros conocimientos");
    
    // Experiencia Laboral
    pinta_explab(cvdat.explab, "#explab", vers_print, cvdat.config);
    msgLog("Pintado Experiencia Laboral");

    // Educación
    pinta_estudios(cvdat.estudios, "#estudiosdet", vers_print);
    msgLog("Pintado Estudios");
    
    // Formaciones
    pinta_formaciones(cvdat.tipos_formacion, cvdat.formacion, "#otraform", vers_print);
    //pinta_fortech(cvdat.fortech, "#fortech", vers_print);
    msgLog("Pintado Formaciones");

    /*Otra Formación
    $("#otraform").html(" ");
    cvdat.otraform.forEach(function(elem,i) {
      $("#otraform").append("<tr><td>" + elem.periodo + "</td><td>" + elem.descripcion + "</td></tr>");       
    });
    msgLog("Pintado Otra Formación");
    */

    // Contactos
    if (cvdat.datos_pers) {
      if (vers_print) {
        pinta_datos_pers_tabla(cvdat.datos_pers, "#contactos_prn_body");
      } else {
        $("#cont_download").html("<a href='" + data_folder + "/cv_datos.json' download><img src='recursos/json-ld-button.svg' width='110' border='0' alt='' title='Descarga los datos del CV en formato jSON'></a>");
        pinta_datos_pers_iconos(cvdat.datos_pers, "#contact_iconos");
      };
    };
    msgLog("Pintado Contactos");

    // Pié
    $("#ult_act").append("<small>© de los datos de este CV: 2016 " + cvdat.nombre + " | Última actualización: " + cvdat.ultima_actualiz + " | <a href ='" + cvdat.url + "'>" + cvdat.url + ".</a></small>");
    if (!vers_print) {
      // Fecha de actualización de la página / Versión para imprimir
      $("#cont_print").html("<a href='cv.html?printversion=1'><img src='recursos/print_blue.png' height='63' border='0' alt='' title='Ir a la versión para imprimir'></a>");
    } else {
      // Fecha de actualización de la página / Versión para imprimir
      $("#cont_print").html("<a href='cv.html'><img src='recursos/midori-icon.png' height='63' border='0' alt='' title='Ir a la versión Web'></a>");      
    };
    msgLog("Pintado Pié");

  });  // leer los datos
    // alert("fin ready");

  }); // function Ready
}); // function jQuery 

