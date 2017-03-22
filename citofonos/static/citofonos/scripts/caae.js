/**
 * Created by marlon on 21-09-16.
 */


 $(document).ready(function () {


     //aadff = $(".js-example-basic-multiple").length

//if ($(".js-example-basic-multiple").length > 0)
   //$(".js-example-basic-multiple").select2();


     function guardar_derivacion(){
         id_persona =''
         cod_area = $('#sellistt').val()
         nota = $('#nota_a_enviar').val()


/*ESTA OPCION ES PARA  SELECCIONAR LOS VALROES DE UN CHECKBOX DE CLASE XXX*/
         var values = (function() {
                var a = [];
                $(".i-checks:checked").each(function() {
                    a.push(this.value);
                });
                return a;
            })()

         if ( values.length != 1)
         {
             //alert("Debe haber solo una persona seleccionada.")
         }
         id_persona = values[0]


         bootbox.confirm({
                        size:'small',
                        message: "¿Está seguro de enviar los datos?",
                        buttons: {
                            confirm: {
                                label: 'Si',
                                className: 'btn-success'
                            },
                            cancel: {
                                label: 'No',
                                className: 'btn-danger'
                            }
                        },

                        callback: function(result) {

                            if (result)
                            {

                                $.ajax({
                                    url: '/ajax_guardar_derivacion/',
                                    data: {var1: id_persona, var2: cod_area, var3: nota},
                                    type: 'POST',
                                    datatype: 'json',
                                    success: function (json) {


                                        $.each(json, function (i, item) {

                                            if (i != 0) {


                                                var arr = item.split("#")
                                                if (arr[0] == 'Ok') {
                                                    bootbox.alert("Se ha enviado correctamente.")
                                                    window.location.href = "/derivar/";

                                                }

                                            }
                                        })
                                    },

                                    error: function (xhr, errmsg, err) {
                                        var aa = err
                                        var i = 0
                                    }

                                })


                        }
             }
         })


















     }



     function recargar_elementos() {


         $("#contenido_der").empty()
         $('#nota_enviada').val("")
         id_persona =''
         cod_area = $('#sellistt').val()
         nota = $('#nota_a_enviar').val()
         val = ''

         //var ansValue = $("#idcheck").prop('checked') //? $("#ans").val() : 0;



         /*ESTA OPCION ES PARA  SELECCIONAR LOS VALROES DE UN CHECKBOX DE CLASE XXX*/
         var values = (function() {
                var a = [];
                $(".i-checks:checked").each(function() {
                    a.push(this.value);
                });
                return a;
            })()

         if ( values.length != 1)
         {
             //alert("Debe haber solo una persona seleccionada.")
         }
         id_persona = values[0]


         $.ajax({
                  url:'/ajax_recargar_componentes/',
                  data: {var1:id_persona, var2:cod_area, var3:nota},
                  type: 'POST',
                  datatype: 'json',
                  success: function (json) {

                        $('#agregadas').empty().append('whatever');

                       $.each(json,function (i, item) {

                           if (i!=0) {

                               agr = 'Agregar'
                               var arr = item.split("#")



                               $('#agregadas').append($('<option>',
                                 {
                                    value: i,
                                    text : arr[2]
                                }));

                       }})
                  },

                  error: function (xhr,errmsg,err) {
                                var aa = err
                                var i = 0
                            }

              })
         

         $.ajax({
                  url:'/ajax_cargar_imagen/',
                  data: {var1:id_persona},
                  type: 'POST',
                  datatype: 'json',
                  success: function (json) {

                       $.each(json,function (i, item) {

                           if (i!=0) {


                               var arr = item.split("#")


                                $("#img_persona").attr('src', '/static/gestion/' +arr[0] );
                               //"{% static 'gestion' %}{{ '150035899' | obtener_foto_dev }}"

                                $("#contenido_der").empty()
                                $("#contenido_der").append("<strong>"+ arr[1]+"</strong> <br>" +
                                    "<small class='text-muted'>Estudiante de <strong>"+arr[2]+"</strong> <br></small>" +
                                    "" +
                                    "")

                       }})
                  },

                  error: function (xhr,errmsg,err) {
                                var aa = err
                                var i = 0
                            }

              })


         
         $.ajax({
                  url:'/ajax_cargar_resumen/',
                  data: {var1:id_persona, var2:cod_area, var3:nota},
                  type: 'POST',
                  datatype: 'json',
                  success: function (json) {

                      $(".feed-activity-list").empty()
                       $.each(json,function (i, item) {

                           if (i!=0) {


                               var arr = item.split("#")


                                $(".feed-activity-list").append('<div class="feed-element">' +
                                    '<a href="#" class="pull-left"><i class="fa fa-cube fa-2x"></i> </a>' +
                                    '<div class="media-body ">' +
                                                //'<small class="pull-right">2h ago</small>' +

                                                '<small class="text-muted">Se solicita derivar a:</small>' +
                                                '<div class="actions">' +
                                                    //'<a class="btn btn-xs btn-white"><i class="fa fa-thumbs-up"></i> Psicología </a>' +
                                                    '<a class="btn btn-xs btn-white"><i class="fa fa-heart"></i> '+arr[2]+'</a>' +
                                                '</div>' +

                                                '<div class="well">' +
                                                    arr[3] +
                                               '</div>' +
                                            '</div>' +
                                    '' +

                                    '</div>')

                       }})
                  },

                  error: function (xhr,errmsg,err) {
                                var aa = err
                                var i = 0
                            }

              })



















         
     } //fin recargar elementos
     

      $("#wizard").steps();
            $("#form").steps({
                bodyTag: "fieldset",
                onStepChanging: function (event, currentIndex, newIndex)
                {

                     /// CADA VEZ QUE AVANZO UN STEP, RECARGO SI HAY ELEMENTOS
                    recargar_elementos()
                    /*
                    bootbox.confirm({
                        size:'small',
                        message: "¿Confirma que desea importar estos datos de alumnos con CAE?",
                        callback: function(result) {

                        }

                    })
                    */
                    //bootbox.alert("Holis a todos")

                    $("#save_state").empty() // Borro el indicador de guardado de mensaje


/*                  // Permite regresar atras aunque no este validada
                    // Always allow going backward even if the current step contains invalid fields!
                    if (currentIndex > newIndex)
                    {
                        return true;
                    }

                    // Forbid suppressing "Warning" step if the user is to young
                    if (newIndex === 3 && Number($("#age").val()) < 18)
                    {
                        return false;
                    }
*/
                    var form = $(this);
/*
                    // Clean up if user went backward before
                    if (currentIndex < newIndex)
                    {
                        // To remove error styles
                        $(".body:eq(" + newIndex + ") label.error", form).remove();
                        $(".body:eq(" + newIndex + ") .error", form).removeClass("error");
                    }

                    // Disable validation on fields that are disabled or hidden.
                    form.validate().settings.ignore = ":disabled,:hidden";

                    // Start validation; Prevent going forward if false
                    */
                    return form.valid();
                },
                onStepChanged: function (event, currentIndex, priorIndex)
                {

                    // Suppress (skip) "Warning" step if the user is old enough.
                    if (currentIndex === 2 && Number($("#age").val()) >= 18)
                    {
                        $(this).steps("next");
                    }

                    // Suppress (skip) "Warning" step if the user is old enough and wants to the previous step.
                    if (currentIndex === 2 && priorIndex === 3)
                    {
                        $(this).steps("previous");
                    }

                },
                onFinishing: function (event, currentIndex)
                {
                    var form = $(this);

                    // Disable validation on fields that are disabled.
                    // At this point it's recommended to do an overall check (mean ignoring only disabled fields)
                    form.validate().settings.ignore = ":disabled";

                    // Start validation; Prevent form submission if false
                    return form.valid();
                },
                onFinished: function (event, currentIndex)
                {

                    guardar_derivacion()
                    var form = $(this);

                    // Submit form input
                    form.submit();
                }
            }).validate({
                        errorPlacement: function (error, element)
                        {
                            element.before(error);
                        },
                        rules: {
                            confirm: {
                                equalTo: "#password"
                            }
                        }
                    });



     $('#tpersonas').DataTable({
                    "lengthMenu": [[10000], [10000]],
                    "language": {
                        "lengthMenu": "", //"Display _MENU_ records per page",
                        "zeroRecords": "Nada desplegado",
                        "info": "Showing page _PAGE_ of _PAGES_",
                        "infoEmpty": "No hay registros",
                        "infoFiltered": "(filtered from _MAX_ total records)",
                        "sSearch": "Buscar: "
                    },
                    "dom": ''
                    //Visible busqueda//"dom": '<"top"f>rt<"bottom"><"clear">'

                });





     var tablePersonas  = $('#tpersonas').DataTable();


      $("#but1").click(function () {

          alert("Prueba")

      })

     // $("#firtname").keyup(function () {
          $("#buscar_per").click(function() {
             //$('#buscar_per').on('keypress', function (e) {

            // if(e.which === 13) {


                 tablePersonas.clear()

                 //Obtengo nombre de persona
                 var nombres = $('#firtname').val()
                 var apelldios = $('#lastname').val()
                 var rut = $('#rut').val()

                 //alert(nombres)

                 $.ajax({
                     url: '/ajax_cargar_personas/',
                     data: {var1: nombres, var2: apelldios, var3: rut},
                     type: 'POST',
                     datatype: 'json',
                     success: function (json) {


                         $.each(json, function (i, item) {

                             if (i != 0) {
                                 var arr = item.split("#")


                                 tablePersonas.row.add([

                                     '<input class="i-checks" name="per- ' + arr[0] + '" type="checkbox" id="id' + arr[0] + '" value="' + arr[0] + '"> </>',

                                     arr[0],
                                     arr[1],
                                     arr[2],

                                 ]).draw(false);
                             }
                         })
                     },

                     error: function (xhr, errmsg, err) {
                         var aa = err
                         var i = 0
                     }

                 })

            // }// end 13
    }) // evento por nombres




     $("#lastname").keyup(function () {
        tablePersonas.clear()

          //Obtengo nombre de persona
          var nombres = $('#firtname').val()
          var apelldios = $('#lastname').val()
          var rut = $('#rut').val()

          //alert(nombres)

          $.ajax({
              url:'/ajax_cargar_personas/',
              data: {var1:nombres, var2:apelldios, var3:rut},
              type: 'POST',
              datatype: 'json',
              success: function (json) {
                   $.each(json,function (i, item) {

                       if (i!=0) {
                           var arr = item.split("#")
                           tablePersonas.row.add([

                                        '<input class="i-checks" name="per- ' + arr[0] + '" type="checkbox" id="id' + arr[0] + '" value="'+ arr[0] +'"> </>',

                                        arr[0],
                                        arr[1],
                                        arr[2],

                                    ]).draw(false);
                   }})
              },

              error: function (xhr,errmsg,err) {
                            var aa = err
                            var i = 0
                        }

          })

    }) // evento por apellidos



$("#rut").keyup(function () {
        tablePersonas.clear()

          //Obtengo nombre de persona
          var nombres = $('#firtname').val()
          var apelldios = $('#lastname').val()
          var rut = $('#rut').val()

          //alert(nombres)

          $.ajax({
              url:'/ajax_cargar_personas/',
              data: {var1:nombres, var2:apelldios, var3:rut},
              type: 'POST',
              datatype: 'json',
              success: function (json) {


                   $.each(json,function (i, item) {

                       if (i!=0) {
                           var arr = item.split("#")


                           tablePersonas.row.add([

                                        '<input class="i-checks" name="per- ' + arr[0] + '" type="checkbox" id="id' + arr[0] + '" value="'+ arr[0] +'"> </>',

                                        arr[0],
                                        arr[1],
                                        arr[2],

                                    ]).draw(false);
                   }})
              },

              error: function (xhr,errmsg,err) {
                            var aa = err
                            var i = 0
                        }

          })

    }) // evento por rut




  $('.slimScrollDiv').slimScroll({
      allowPageScroll: true
  });

       $('.full-height-scroll').slimScroll({
      allowPageScroll: true
  });





     /// MUESTRA LA INFORMACIÓN DE LOS DERIVANTES


$("[id*=mas_informacion]").click(function(){

        rut_persona = $(this).attr("value")
        //$("#mensaje").empty()
        window.location.href = "/informacion_derivar/" + rut_persona;
    

})









     /*##########################  GESTION DE DERIVACIONES ############################  */
     /*#################################################################################*/
     $("[id*=aceptado_sel]").click(function(){


         //alert($(this).attr("value"))
        id_derivacion = $(this).attr("value")
        $("#mensaje").empty()
         $("#carrera").empty()
         $("#rut").empty()
         $("#vertical-timeline").empty()

         $('#img_cargar_detalles').show()

         $.ajax({
              url:'/ajax_seleccionar_aceptada/',
              data: {var1:id_derivacion},
              type: 'POST',
              datatype: 'json',
              success: function (json) {

                    rut = ''


                  $('#img_cargar_detalles').hide()
                   $.each(json,function (i, item) {

                       if (i!=0) {
                           var arr = item.split("#")
                            $("#mensaje").empty()
                            $("#mensaje").append(arr[0])
                            $("#nombres").empty()
                            $("#nombres").append(arr[1])

                            $("#img_persona_gd").attr('src', '/static/gestion/media/pictures/0' +arr[3]+".jpg" );

                           $("#carrera").empty()
                           $("#carrera").append(arr[4])

                           $("#rut").empty()
                            $("#rut").append(arr[3])

                           $("#estado_deriv").append(arr[5])
                           $("#area").append(arr[6])
                           $("#mensaje").append(arr[7])

                           $("#caes").empty()
                           $("#caes").append(arr[11])


                            $("#carrerac").empty()
                           $("#carrerac").append(arr[4])

                           $("#nac").empty()
                           $("#nac").append(arr[12])

                           $("#edad").empty()
                           $("#edad").append(arr[13])

                           $("#genero").empty()
                           $("#genero").append(arr[14])



                           $("#anio_cursa").empty()
                           $("#anio_cursa").append(arr[15])

                           $("#nacionalidad").empty()
                           $("#nacionalidad").append(arr[16])

                           $("#telefono").empty()
                           $("#telefono").append(arr[17])

                           $("#correo").empty()
                           $("#correo").append(arr[18])

                           //Logica para el timeline
                           timeline_pendiente = "vertical-timeline-icon gray-bg"

                           if (arr[5] == 'PENDIENTE'){
                               timeline_pendiente = "vertical-timeline-icon gray-bg"
                               timeline_icon ="fa fa-clock-o"
                           }
                           if (arr[5] == 'ACOGIDA'){
                               timeline_pendiente = "vertical-timeline-icon navy-bg"
                               timeline_icon ="fa fa-check"
                           }
                           if (arr[5] == 'NO_PROCEDE'){
                               timeline_pendiente = "vertical-timeline-icon yellow-bg"
                               timeline_icon ="fa fa-times"
                           }
                           if (arr[5] == 'ALU_RECHAZA'){
                               timeline_pendiente = "vertical-timeline-icon yellow-bg"
                               timeline_icon ="fa fa-times"
                           }

                           //Logica de usuario
                           //nombres =



                           $("#vertical-timeline").append('<div class="vertical-timeline-block">' +
                               '<div id="timeline_'+i+'" class="'+timeline_pendiente+'">' +
                               '<i class="'+timeline_icon+'"></i>' +
                               ' </div>' +
                               '<div class="vertical-timeline-content">' +
                               '<span class="vertical-date small text-muted">Por '+arr[10]+', el (</span>'+
                               '<span class="vertical-date small text-muted"> ' + arr[8]+')</span> <br>' +
                               ' <p>'+ arr[7] +
                               '</p>' +
                                   '<span class="badge badge-info">'+arr[6]+'</span>'+

                                 '<br>' +
                               '</div>' +

                               '</div>')

                            rut = ''
                            rut = arr[3]


                       }})

                   id_rut = $("[id*=consolagestion]").attr("id")
                   id = id_rut.split("_")[0]
                   nuevo_id = id + '_' + rut
                   $("#"+id_rut).attr('id', nuevo_id)


              },

              error: function (xhr,errmsg,err) {
                            var aa = err
                            var i = 0
                        }

          })

     })








//CUANDO SE SELECCIONA UNA PERSONA EN ESPERA
     $("[id*=rechazado_sel]").click(function(){


         //alert($(this).attr("value"))
        id_derivacion = $(this).attr("value")
        $("#mensaje").empty()
         $("#carrera").empty()
         $("#rut").empty()
         $("#vertical-timeline").empty()

         $('#img_cargar_detalles').show()

         $.ajax({
              url:'/ajax_seleccionar_rechazada/',
              data: {var1:id_derivacion},
              type: 'POST',
              datatype: 'json',
              success: function (json) {

                    rut = ''


                  $('#img_cargar_detalles').hide()
                   $.each(json,function (i, item) {

                       if (i!=0) {
                           var arr = item.split("#")
                            $("#mensaje").empty()
                            $("#mensaje").append(arr[0])
                            $("#nombres").empty()
                            $("#nombres").append(arr[1])

                            $("#img_persona_gd").attr('src', '/static/gestion/media/pictures/0' +arr[3]+".jpg" );

                           $("#carrera").empty()
                           $("#carrera").append(arr[4])

                           $("#rut").empty()
                            $("#rut").append(arr[3])

                           $("#estado_deriv").append(arr[5])
                           $("#area").append(arr[6])
                           $("#mensaje").append(arr[7])

                           $("#caes").empty()
                           $("#caes").append(arr[11])


                            $("#carrerac").empty()
                           $("#carrerac").append(arr[4])

                           $("#nac").empty()
                           $("#nac").append(arr[12])

                           $("#edad").empty()
                           $("#edad").append(arr[13])

                           $("#genero").empty()
                           $("#genero").append(arr[14])



                           $("#anio_cursa").empty()
                           $("#anio_cursa").append(arr[15])

                           $("#nacionalidad").empty()
                           $("#nacionalidad").append(arr[16])

                           $("#telefono").empty()
                           $("#telefono").append(arr[17])

                           $("#correo").empty()
                           $("#correo").append(arr[18])

                           //Logica para el timeline
                           timeline_pendiente = "vertical-timeline-icon gray-bg"

                           if (arr[5] == 'PENDIENTE'){
                               timeline_pendiente = "vertical-timeline-icon gray-bg"
                               timeline_icon ="fa fa-clock-o"
                           }
                           if (arr[5] == 'ACOGIDA'){
                               timeline_pendiente = "vertical-timeline-icon navy-bg"
                               timeline_icon ="fa fa-check"
                           }
                           if (arr[5] == 'NO_PROCEDE'){
                               timeline_pendiente = "vertical-timeline-icon yellow-bg"
                               timeline_icon ="fa fa-times"
                           }
                           if (arr[5] == 'ALU_RECHAZA'){
                               timeline_pendiente = "vertical-timeline-icon yellow-bg"
                               timeline_icon ="fa fa-times"
                           }
                           
                           //Logica de usuario
                           //nombres =



                           $("#vertical-timeline").append('<div class="vertical-timeline-block">' +
                               '<div id="timeline_'+i+'" class="'+timeline_pendiente+'">' +
                               '<i class="'+timeline_icon+'"></i>' +
                               ' </div>' +
                               '<div class="vertical-timeline-content">' +
                               '<span class="vertical-date small text-muted">Por '+arr[10]+', el (</span>'+
                               '<span class="vertical-date small text-muted"> ' + arr[8]+')</span> <br>' +
                               ' <p>'+ arr[7] +
                               '</p>' +
                                   '<span class="badge badge-info">'+arr[6]+'</span>'+

                                 '<br>' +
                               '</div>' +

                               '</div>')

                            rut = ''
                            rut = arr[3]


                       }})

                   id_rut = $("[id*=consolagestion]").attr("id")
                   id = id_rut.split("_")[0]
                   nuevo_id = id + '_' + rut
                   $("#"+id_rut).attr('id', nuevo_id)


              },

              error: function (xhr,errmsg,err) {
                            var aa = err
                            var i = 0
                        }

          })

     })
     
     
     ////////////////////////////////////////////////
     


     //CUANDO SE SELECCIONA UNA PERSONA EN ESPERA
     $("[id*=espera_sel]").click(function(){


         //alert($(this).attr("value"))
        id_derivacion = $(this).attr("value")
        $("#mensaje").empty()
         $("#carrera").empty()
         $("#rut").empty()
         $("#vertical-timeline").empty()

         $('#img_cargar_detalles').show()

         $.ajax({
              url:'/ajax_seleccionar_en_espera/',
              data: {var1:id_derivacion},
              type: 'POST',
              datatype: 'json',
              success: function (json) {

                    rut = ''


                  $('#img_cargar_detalles').hide()
                   $.each(json,function (i, item) {

                       if (i!=0) {
                           var arr = item.split("#")
                            $("#mensaje").empty()
                            $("#mensaje").append(arr[0])
                            $("#nombres").empty()
                            $("#nombres").append(arr[1])

                            $("#img_persona_gd").attr('src', '/static/gestion/media/pictures/0' +arr[3]+".jpg" );

                           $("#carrera").empty()
                           $("#carrera").append(arr[4])

                           $("#rut").empty()
                            $("#rut").append(arr[3])

                           $("#estado_deriv").append(arr[5])
                           $("#area").append(arr[6])
                           $("#mensaje").append(arr[7])

                           $("#caes").empty()
                           $("#caes").append(arr[11])


                            $("#carrerac").empty()
                           $("#carrerac").append(arr[4])

                           $("#nac").empty()
                           $("#nac").append(arr[12])

                           $("#edad").empty()
                           $("#edad").append(arr[13])

                           $("#genero").empty()
                           $("#genero").append(arr[14])



                           $("#anio_cursa").empty()
                           $("#anio_cursa").append(arr[15])

                           $("#nacionalidad").empty()
                           $("#nacionalidad").append(arr[16])

                           $("#telefono").empty()
                           $("#telefono").append(arr[17])

                           $("#correo").empty()
                           $("#correo").append(arr[18])

                           //Logica para el timeline
                           timeline_pendiente = "vertical-timeline-icon gray-bg"

                           if (arr[5] == 'PENDIENTE'){
                               timeline_pendiente = "vertical-timeline-icon gray-bg"
                               timeline_icon ="fa fa-clock-o"
                           }
                           if (arr[5] == 'ACOGIDA'){
                               timeline_pendiente = "vertical-timeline-icon navy-bg"
                               timeline_icon ="fa fa-check"
                           }
                           if (arr[5] == 'NO_PROCEDE'){
                               timeline_pendiente = "vertical-timeline-icon yellow-bg"
                               timeline_icon ="fa fa-times"
                           }
                           if (arr[5] == 'ALU_RECHAZA'){
                               timeline_pendiente = "vertical-timeline-icon yellow-bg"
                               timeline_icon ="fa fa-times"
                           }
                           
                           //Logica de usuario
                           //nombres =



                           $("#vertical-timeline").append('<div class="vertical-timeline-block">' +
                               '<div id="timeline_'+i+'" class="'+timeline_pendiente+'">' +
                               '<i class="'+timeline_icon+'"></i>' +
                               ' </div>' +
                               '<div class="vertical-timeline-content">' +
                               '<span class="vertical-date small text-muted">Por '+arr[10]+', el (</span>'+
                               '<span class="vertical-date small text-muted"> ' + arr[8]+')</span> <br>' +
                               ' <p>'+ arr[7] +
                               '</p>' +
                                   '<span class="badge badge-info">'+arr[6]+'</span>'+

                                 '<br>' +
                               '</div>' +

                               '</div>')

                            rut = ''
                            rut = arr[3]


                       }})

                   id_rut = $("[id*=consolagestion]").attr("id")
                   id = id_rut.split("_")[0]
                   nuevo_id = id + '_' + rut
                   $("#"+id_rut).attr('id', nuevo_id)


              },

              error: function (xhr,errmsg,err) {
                            var aa = err
                            var i = 0
                        }

          })

     })

     /*#################################################################################*/
     /*#################################################################################*/
     /*#################################################################################*/

/*
     $("#consolagestionholisss").on('click',function() {

         alert($(this).attr("id"))

     })
*/

/*
      $("[id*=consola_gestion]").click(function(){



      })
      */




      $("body").delegate("[id*=calendariogestion]", 'click', function(){
         id_completo = $(this).attr('id')
         id_deriv = id_completo.split("_")[1]

          $("#content_deriv").text(id_deriv) // Guardo el valor de la derivacion, para cargarlo una vez cargado el calendario
          
          $("#modal_agendar").modal('show');

     });




      $("#confirmar_agendar_profesional").click(function () {

         var id_deriv = $("#content_deriv").text()
         var profesional = $("#profesional option:selected").val();



         window.location.href = "/calendario_u/" + id_deriv + "/" + profesional



     }) //end_click

















     $("body").delegate("[id*=consolagestion]", 'click', function(){

         id_completo = $(this).attr('id')
         rut = id_completo.split("_")[1]
         //alert();

         window.location.href = "/consola_gestion/"+ rut

     });


     $("body").delegate("[id*=rechazar_]", 'click', function(){
         id_completo = $(this).attr('id')
         id_deriv = id_completo.split('_')[1]
         rut_persona = id_completo.split('_')[2]


         bootbox.prompt({
                         title: "No se procede con este alumno.",
                        inputType: 'select',
                        inputOptions: [
                            {
                                text: 'Eliga un tipo...',
                                value: '',
                            },
                            {
                                text: 'No procede',
                                value: '1',
                            },
                            {
                                text: 'Alumno rechaza',
                                value: '2',
                            }
                        ],

                        callback: function(result) {

                            if (result)
                            {
                                opcion_rechazar_deriv = result;

                                  bootbox.prompt({
                                    title: "Escriba un mensaje para este rechazo.",
                                    inputType: 'textarea',
                                    callback: function (result) {
                                            texto_rechazar_deriv = result


                                            if (result != null) { // No confirmo enviar, si el texo es null (presiono no)


                                                bootbox.confirm({
                                                    size: 'small',
                                                    message: "¿Está seguro de enviar los datos?",
                                                    buttons: {
                                                        confirm: {
                                                            label: 'Si',
                                                            className: 'btn-success'
                                                        },
                                                        cancel: {
                                                            label: 'No',
                                                            className: 'btn-danger'
                                                        }
                                                    },

                                                    callback: function (result) {

                                                        if (result) {
                                                            //alert("guardda opcion..." + opcion_rechazar_deriv + '   --Texto:' + texto_rechazar_deriv)

                                                                $.ajax({
                                                                  url:'/ajax_consolagestion_no_procede/',
                                                                  data: {var1:id_deriv, var2:texto_rechazar_deriv, var3:opcion_rechazar_deriv},
                                                                  type: 'POST',
                                                                  datatype: 'json',
                                                                  success: function (json) {


                                                                       $.each(json,function (i, item) {

                                                                           if (i!=0) {
                                                                               var arr = item.split("#")
                                                                               
                                                                       }})
                                                                      
                                                                      //window.location.ref = "/consola_gestion/"+rut_persona
                                                                      $(location).attr('href','/consola_gestion/'+rut_persona);
                                                                      
                                                                  },

                                                                  error: function (xhr,errmsg,err) {
                                                                                var aa = err
                                                                                var i = 0
                                                                            }

                                                              })


                                                        }
                                                    }
                                                })//////
                                            }


                                    }
                                });


        }
             }
         })
         
     })



$('#drevision').DataTable({
                    "lengthMenu": [[10000],[10000]],
                    "dom": '<"top"><"pull-left"f><"pull-right"B>rt<"bottom"><"clear">',
                    "language": {
                        "lengthMenu": "", //"Display _MENU_ records per page",
                        "zeroRecords": "Nothing found - sorry",
                        "info": "Showing page _PAGE_ of _PAGES_",
                        "infoEmpty": "No records available",
                        "infoFiltered": "(filtered from _MAX_ total records)",
                        "sSearch": "Buscar: "
                    },
                    buttons: [
                        //'copy', 'csv', 'excel', 'pdf', 'print'
                    ]

                });



     $("body").delegate("[id*=aprobar_]", 'click', function(){
         id_completo = $(this).attr('id')
         id_deriv = id_completo.split('_')[1]
         rut_persona = id_completo.split('_')[2]



              bootbox.prompt({
                title: "Puede escribir una nota si lo desea.",
                inputType: 'textarea',
                callback: function (result) {
                        texto_rechazar_deriv = result


                        if (result != null) { // No confirmo enviar, si el texo es null (presiono no)


                            bootbox.confirm({
                                size: 'small',
                                message: "¿Está seguro de aprobar derivación?",
                                buttons: {
                                    confirm: {
                                        label: 'Si',
                                        className: 'btn-success'
                                    },
                                    cancel: {
                                        label: 'No',
                                        className: 'btn-danger'
                                    }
                                },

                                callback: function (result) {

                                    if (result) {
                                        //alert("guardda opcion..." + opcion_rechazar_deriv + '   --Texto:' + texto_rechazar_deriv)

                                            $.ajax({
                                              url:'/ajax_consolagestion_procede/',
                                              data: {var1:id_deriv, var2:texto_rechazar_deriv, var3:opcion_rechazar_deriv},
                                              type: 'POST',
                                              datatype: 'json',
                                              success: function (json) {


                                                   $.each(json,function (i, item) {

                                                       if (i!=0) {
                                                           var arr = item.split("#")

                                                   }})

                                                  //window.location.ref = "/consola_gestion/"+rut_persona
                                                  $(location).attr('href','/consola_gestion/'+rut_persona);

                                              },

                                              error: function (xhr,errmsg,err) {
                                                            var aa = err
                                                            var i = 0
                                                        }

                                          })


                                    }
                                }
                            })//////
                        }


                }
            });

     })








     
     















     $('.i-checks').iCheck({
                checkboxClass: 'icheckbox_square-green',
                radioClass: 'iradio_square-green'
            });

        /* initialize the external events
         -----------------------------------------------------------------*/


        $('#external-events div.external-event').each(function() {

            // store data so the calendar knows to render an event upon drop
            $(this).data('event', {
                title: $.trim($(this).text()), // use the element's text as the event title
                stick: true // maintain when user navigates (see docs on the renderEvent method)
            });

            // make the event draggable using jQuery UI
            $(this).draggable({
                zIndex: 1111999,
                revert: true,      // will cause the event to go back to its
                revertDuration: 0  //  original position after the drag
            });

        });


        /* initialize the calendar
         -----------------------------------------------------------------*/
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        pathd = window.location.pathname.split('/')[2];
        pathd2 = window.location.pathname.split('/')[2] + '/' + window.location.pathname.split('/')[3];
        pathd3 = window.location.pathname.split('/')[2] + '/' + window.location.pathname.split('/')[3] + '/' + window.location.pathname.split('/')[4];
        path3d =  window.location.pathname.split('/')[3] + '/' + window.location.pathname.split('/')[4];
        event_id = window.location.pathname.split('/')[2]



     $('#xcalendar_edit').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listMonth'
            },
            monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
            monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
            dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
            dayNamesShort: ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],
            buttonText: {today:'hoy', month: 'mes',  week: 'semana',  day: 'dia', list: 'lista'},
            editable: true,
            allDayDefault: false,
            droppable: true, // this allows things to be dropped onto the calendar

            drop: function() {
                // is the "remove after drop" checkbox checked?
                if ($('#drop-remove').is(':checked')) {
                    // if so, remove the element from the "Draggable Events" list
                    $(this).remove();
                }
            },
            locale: 'es',
            events:'/ej_calendario_e/' + pathd2,
            //eventColor: '#378006'

            eventDrop: function(event, delta, revertFunc) {

                //alert(event.title + " was dropped on " + event.start.format());

                //if (!confirm("¿Estas seguro de hacer los cambios?")) {
                 //   revertFunc();
                //}
                //else {

                smes = ''
                sdia = ''
                if ((event.start.month() + 1).toString().length==1)
                    smes =  '0' + (event.start.month() + 1)
                else
                    smes = (event.start.month() + 1)
                if (event.start.date().toString().length == 1 )
                    sdia =  '0' + event.start.date()
                else
                    sdia = event.start.date()
                if (event.start.hours().toString().length == 1 )
                    shora =  '0' + event.start.hours()
                else
                    shora = event.start.hours()
                if (event.start.minutes().toString().length == 1 )
                    smin =  '0' + event.start.minutes()
                else
                    smin = event.start.minutes()



                emes = ''
                edia = ''
                ehora=''
                emin = ''

                if ((event.end.month() + 1).toString().length==1)
                    emes =  '0' + (event.end.month() + 1)
                else
                    emes = (event.end.month() + 1)

                if (event.end.date().toString().length == 1 )
                    edia =  '0' + event.end.date()
                else
                    edia = event.end.date()


                if (event.end.hours().toString().length == 1 )
                    ehora =  '0' + event.end.hours()
                else
                    ehora = event.end.hours()

                if (event.end.minutes().toString().length == 1 )
                    emin =  '0' + event.end.minutes()
                else
                    emin = event.end.minutes()






                var new_start =  event.start.year() + "-" + smes+ "-" + sdia + "T"+shora + ':'+ smin;
                var new_end =  event.end.year() + "-" + emes + "-" + edia + "T"+ehora + ':'+ emin;


                //alert(event.resources);

                $.ajax({
                    url: '/ddaaddaa/',
                    data: {var0: event_id,  var1: new_end, var3: new_start.toString()
                    },
                    type: 'POST',
                    datatype: 'json',
                    success: function (json) {
                        //$('#xcalendar_edit').empty();
                        //loadCalendar();
                        alert("El cambio se ha realizado.");
                        var ruta = '/editar_evento/'+pathd2
                        if (window.location.pathname.includes("editar_evento_u")){

                            ruta = '/editar_evento_u/'+pathd3
                        }

                        $(location).attr('href',ruta);
                    },
                    error: function (xhr, errmsg, error) {
                        alert("Falló!");
                    }
                })


              //}
            }

        });



 $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listMonth'
            },
            monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
            monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
            dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
            dayNamesShort: ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],
            buttonText: {today:'hoy', month: 'mes',  week: 'semana',  day: 'dia', list: 'lista'},
            editable: false,
            allDayDefault: false,
            droppable: false, // this allows things to be dropped onto the calendar

            drop: function() {
                // is the "remove after drop" checkbox checked?
                if ($('#drop-remove').is(':checked')) {
                    // if so, remove the element from the "Draggable Events" list
                    $(this).remove();
                }
            },
            locale: 'es',

            events:'/j_calendario/' + pathd
            //eventColor: '#378006'
            /*
            events: [
                {
                    title: 'All Day Event',
                    start: new Date(y, m, 1)
                },
                {
                    title: 'Long Event',
                    start: new Date(y, m, d-5),
                    end: new Date(y, m, d-2)
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: new Date(y, m, d-3, 16, 0),
                    allDay: false
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: new Date(y, m, d+4, 16, 0),
                    allDay: false
                },
                {
                    title: 'Meeting',
                    start: new Date(y, m, d, 10, 30),
                    allDay: false
                },
                {
                    title: 'Lunch',
                    start: new Date(y, m, d, 12, 0),
                    end: new Date(y, m, d, 14, 0),
                    allDay: false
                },
                {
                    title: 'Birthday Party',
                    start: new Date(y, m, d+1, 19, 0),
                    end: new Date(y, m, d+1, 22, 30),
                    allDay: false
                },
                {
                    title: 'Click for Google',
                    start: new Date(y, m, 28),
                    end: new Date(y, m, 29),
                    url: 'http://google.com/'
                }
            ]*/



        });


     $('#calendar_u').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listMonth'
            },
            monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
            monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
            dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
            dayNamesShort: ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],
            buttonText: {today:'hoy', month: 'mes',  week: 'semana',  day: 'dia', list: 'lista'},
            editable: false,
            allDayDefault: false,
            droppable: false, // this allows things to be dropped onto the calendar

            drop: function() {
                // is the "remove after drop" checkbox checked?
                if ($('#drop-remove').is(':checked')) {
                    // if so, remove the element from the "Draggable Events" list
                    $(this).remove();
                }
            },
            locale: 'es',

            events:'/j_calendario_u/' + pathd3
            //eventColor: '#378006'

        });



          $('#calendar_general').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listMonth'
            },
            monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
            monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
            dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
            dayNamesShort: ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],
            buttonText: {today:'hoy', month: 'mes',  week: 'semana',  day: 'dia', list: 'lista'},
            editable: false,
            allDayDefault: false,
            droppable: false, // this allows things to be dropped onto the calendar

            drop: function() {
                // is the "remove after drop" checkbox checked?
                if ($('#drop-remove').is(':checked')) {
                    // if so, remove the element from the "Draggable Events" list
                    $(this).remove();
                }
            },


            eventMouseover: function(calEvent, jsEvent, view) {

                //alert('Event: ' + calEvent.title);
                //alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
                //alert('View: ' + view.name);

                // change the border color just for fun
                $(this).css('border-color', 'red');

                /*
                setTimeout(function() {
                toastr.options = {
                    closeButton: true,
                    preventDuplicates: true,

                };


                    toastr.info(calEvent.title + "\r  " +calEvent.start.format() + ',' + calEvent.end.format());

                }, 10);
                */




            },


              eventMouseout: function(calEvent, jsEvent, view) {

                //alert('Event: ' + calEvent.title);
                //alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
                //alert('View: ' + view.name);

                // change the border color just for fun
                $(this).css('border-color', '');

            },



            locale: 'es',

            events:'/j_calendario_todos/'
            //eventColor: '#378006'

        });






     //AGREGO UN AVISO, PARA INDICAR QUE LOS EVENTOS AZULES SON EVENTOS DE CALENDARIOS DE OTROS ALUMNOS
     //http://codeseven.github.io/toastr/demo.html

     ruta_actual = window.location.pathname
     if (ruta_actual.includes('calendario'))

           setTimeout(function() {
                toastr.options = {
                    closeButton: true,
                    progressBar: true,
                    showMethod: 'slideDown',
                    timeOut: 6000
                };
                toastr.success('Recuerde que los eventos azules, pertenecen a calendarios de otras derivaciones. Haga clic en uno de ellos para acceder al calendario y ver los eventos de esta derivación.');

            }, 1300);

        /*
      if (ruta_actual.includes('cal_general'))

           setTimeout(function() {
                toastr.options = {
                    closeButton: true,
                    progressBar: true,
                    showMethod: 'slideDown',
                    timeOut: 6000
                };
                toastr.info('En este calendario se reflejan todos los eventos de todos los profesionales.');

            }, 1300);

        */




     var d = new Date();

        var date = new Date();
        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        var end = new Date(date.getFullYear(), date.getMonth(), date.getDate());


     $('#data_1 .input-group.date').datepicker({
                todayBtn: "linked",
                keyboardNavigation: false,
                forceParse: false,
                calendarWeeks: true,
                autoclose: true,
                format: 'dd-mm-yyyy',
                language:'es',
                today: "Hoy",

            });

        //$('#data_1').find("input").val(now())


        $('.clockpicker').clockpicker({
            //$('#termino').val('09:09')
            afterDone: function() {
                    //console.log("after done");

                    var inicio = $('#inicio').val()
                    h = inicio.split(':')[0]
                    m = inicio.split(':')[1]
                    hi = + h
                    hi = hi + 1
                    if (hi == 24)
                    {hi = 0}

                    his = ''
                    if (hi.toString().length==1)
                        his = '0' + hi
                    else
                        his = '' + hi



                    $('#termino').val(his + ':' + m)

               }
        });

        $('.clockpicker2').clockpicker();


/*
     $("body").delegate("[id*=inicio]", 'change', function(){

         $('#termino').val('09:09')

     })
*/



     $("body").delegate("[id*=agendar_]", 'click', function(){
         id_completo = $(this).attr('id')
         id_deriv = id_completo.split('_')[1]
         rut_profesional = id_completo.split('_')[2]
         titulo = $("#titulo").val()
         dia = $('#data_1').find("input").val()
         inicio = $("#inicio").val()
         termino = $("#termino").val()

                // No confirmo enviar, si el texo es null (presiono no)


         if ((titulo.trim() == '') || (inicio.trim() == '') || (termino.trim() == ''))   {
             bootbox.alert("Titulo vacío. Por favor rellenar.")
         }
            else

                bootbox.confirm({
                                size: 'small',
                                message: "¿Desea agendar?",
                                buttons: {
                                    confirm: {
                                        label: 'Si',
                                        className: 'btn-success'
                                    },
                                    cancel: {
                                        label: 'No',
                                        className: 'btn-danger'
                                    }
                                },

                                callback: function (result) {

                                    if (result) {

                                            $.ajax({
                                              url:'/ajax_agendar/',
                                              data: {
                                                  var1:id_deriv,
                                                  var2:rut_profesional,
                                                  var3:titulo,
                                                  var4:dia,
                                                  var5:inicio,
                                                  var6:termino,
                                              },
                                              type: 'POST',
                                              datatype: 'json',
                                              success: function (json) {
                                                  //window.location.ref = "/consola_gestion/"+rut_persona
                                                  $(location).attr('href','/calendario/'+id_deriv);

                                              },

                                              error: function (xhr,errmsg,err) {
                                                            var aa = err
                                                            var i = 0
                                                        }

                                          })
                                    }
                                }
                            //////


            });//end voot box
     }) //end delegate











      $("body").delegate("[id*=agendaru_]", 'click', function(){
         id_completo = $(this).attr('id')
         id_deriv = id_completo.split('_')[1]
         rut_profesional = id_completo.split('_')[2]
         titulo = $("#titulo").val()
         dia = $('#data_1').find("input").val()
         inicio = $("#inicio").val()
         termino = $("#termino").val()

                // No confirmo enviar, si el texo es null (presiono no)


         if ((titulo.trim() == '') || (inicio.trim() == '') || (termino.trim() == ''))   {
             bootbox.alert("Titulo vacío. Por favor rellenar.")
         }
            else

                bootbox.confirm({
                                size: 'small',
                                message: "¿Desea agendar?",
                                buttons: {
                                    confirm: {
                                        label: 'Si',
                                        className: 'btn-success'
                                    },
                                    cancel: {
                                        label: 'No',
                                        className: 'btn-danger'
                                    }
                                },

                                callback: function (result) {

                                    if (result) {

                                            $.ajax({
                                              url:'/ajax_agendar/',
                                              data: {
                                                  var1:id_deriv,
                                                  var2:rut_profesional,
                                                  var3:titulo,
                                                  var4:dia,
                                                  var5:inicio,
                                                  var6:termino,
                                              },
                                              type: 'POST',
                                              datatype: 'json',
                                              success: function (json) {
                                                  //window.location.ref = "/consola_gestion/"+rut_persona
                                                  $(location).attr('href','/calendario_u/'+id_deriv+'/'+rut_profesional);

                                              },

                                              error: function (xhr,errmsg,err) {
                                                            var aa = err
                                                            var i = 0
                                                        }

                                          })
                                    }
                                }
                            //////


            });//end voot box




     }) //end delegate





     $("body").delegate("[id*=modgendar]", 'click', function(){

         titulo = $("#titulo").val()
         dia = $('#data_1').find("input").val()
         inicio = $("#inicio").val()
         termino = $("#termino").val()
         estado_evento = $("#estado_evento").val()

         id_evento = window.location.pathname.split('/')[2]


         pathd2 = window.location.pathname.split('/')[2] + '/' + window.location.pathname.split('/')[3];





                // No confirmo enviar, si el texo es null (presiono no)


         if ((titulo.trim() == '') || (inicio.trim() == '') || (termino.trim() == ''))   {
             bootbox.alert("Titulo vacío. Por favor rellenar.")
         }
            else

                bootbox.confirm({
                                size: 'small',
                                message: "¿Desea modificar el evento?",
                                buttons: {
                                    confirm: {
                                        label: 'Si',
                                        className: 'btn-success'
                                    },
                                    cancel: {
                                        label: 'No',
                                        className: 'btn-danger'
                                    }
                                },

                                callback: function (result) {

                                    if (result) {

                                            $.ajax({
                                              url:'/ajax_mod_agendar/',
                                              data: {
                                                  var1:id_evento,

                                                  var3:titulo,
                                                  var4:dia,
                                                  var5:inicio,
                                                  var6:termino,
                                                  var7:estado_evento
                                              },
                                              type: 'POST',
                                              datatype: 'json',
                                              success: function (json) {



                                                 //alert('Modificadoooo')
                                                  //window.location.ref = "/consola_gestion/"+rut_persona
                                                  $(location).attr('href','/editar_evento/'+pathd2);

                                              },

                                              error: function (xhr,errmsg,err) {
                                                            var aa = err
                                                            var i = 0
                                                        }

                                          })
                                    }
                                }
                            //////
            });//end boot box
     }) //end delegate




     $("body").delegate("[id*=modgendaru]", 'click', function(){

         titulo = $("#titulo").val()
         dia = $('#data_1').find("input").val()
         inicio = $("#inicio").val()
         termino = $("#termino").val()
         estado_evento = $("#estado_evento").val()

         id_evento = window.location.pathname.split('/')[2]


         pathd2 = window.location.pathname.split('/')[2] + '/' + window.location.pathname.split('/')[3];





                // No confirmo enviar, si el texo es null (presiono no)


         if ((titulo.trim() == '') || (inicio.trim() == '') || (termino.trim() == ''))   {
             bootbox.alert("Titulo vacío. Por favor rellenar.")
         }
            else

                bootbox.confirm({
                                size: 'small',
                                message: "¿Desea modificar el evento?",
                                buttons: {
                                    confirm: {
                                        label: 'Si',
                                        className: 'btn-success'
                                    },
                                    cancel: {
                                        label: 'No',
                                        className: 'btn-danger'
                                    }
                                },

                                callback: function (result) {

                                    if (result) {

                                            $.ajax({
                                              url:'/ajax_mod_agendar/',
                                              data: {
                                                  var1:id_evento,

                                                  var3:titulo,
                                                  var4:dia,
                                                  var5:inicio,
                                                  var6:termino,
                                                  var7:estado_evento
                                              },
                                              type: 'POST',
                                              datatype: 'json',
                                              success: function (json) {



                                                 //alert('Modificadoooo')
                                                  //window.location.ref = "/consola_gestion/"+rut_persona
                                                  $(location).attr('href','/editar_evento_u/'+pathd3);

                                              },

                                              error: function (xhr,errmsg,err) {
                                                            var aa = err
                                                            var i = 0
                                                        }

                                          })
                                    }
                                }
                            //////
            });//end boot box
     }) //end delegate



        // AL MOMENTO DE GUARDAR UN SEGUIMIENTO
        $("#seg_guardar").click( function () {
            //
            var estado = $("#sestado_id option:selected").text();
            var nota_rapida = $("#frase_id option:selected").text();
            var nota = $("#nota_id").val()

            $( "#seg_conf_estado" ).empty()
            $( "#seg_conf_estado" ).append( '<p class="text-warning"><small>'+estado+'</small></p> ');
            $( "#seg_conf_frase" ).empty()
            $( "#seg_conf_frase" ).append( '<p><small>'+nota_rapida+'</small></p> ');
            $( "#seg_conf_nota" ).empty()
            $( "#seg_conf_nota" ).append( '<p class="text-navy"><small>'+nota+'</small></p> ');

            $("#myModal").modal('show');
        });


     
     // AL MOMENTO DE GUARDAR UN SEGUIMIENTO
        $("#ver_mis_derivados").click( function () {
            //
            var estado = $("#sestado_id option:selected").text();
            var nota_rapida = $("#frase_id option:selected").text();
            var nota = $("#nota_id").val()

            $( "#seg_conf_estado" ).empty()
            $( "#seg_conf_estado" ).append( '<p class="text-warning"><small>'+estado+'</small></p> ');
            $( "#seg_conf_frase" ).empty()
            $( "#seg_conf_frase" ).append( '<p><small>'+nota_rapida+'</small></p> ');
            $( "#seg_conf_nota" ).empty()
            $( "#seg_conf_nota" ).append( '<p class="text-navy"><small>'+nota+'</small></p> ');

            $("#modal_derivar").modal('show');
        });
     




      $("#b_modal_detalles_seg").click( function () {
            //
            $("#modal_detalles_seg").modal('show');
        });

    $("#b_modal_contrasena").click( function () {
            //
            $("#modal_contrasena").modal('show');
        
        });




     $("#primir").click( function () {
            //
            $("#cont").printThis({
                debug: false,
                importCSS: true,
                importStyle: true,
                printContainer: true,
                loadCSS: "../css/style.css",
                pageTitle: "My Modal",
                removeInline: false,
                printDelay: 333,
                header: null,
                formValues: true
            });
        });
     

     $("#confirmar_seguimiento").click(function () {
         var estado = $("#sestado_id option:selected").val();
         var nota_rapida = $("#frase_id option:selected").val();
         var nota = $("#nota_id").val()
         idDeriv = window.location.pathname.split('/')[2]

         $.ajax({
              url:'/ajax_guardar_seguimiento/',
              data: {estado:estado, nota_rapida:nota_rapida, nota:nota, id_deriv:idDeriv},
              type: 'POST',
              datatype: 'json',
              success: function (json) {


                  //window.location.ref = "/consola_gestion/"+rut_persona
                  $(location).attr('href','/seguimiento/'+idDeriv);

              },

              error: function (xhr,errmsg,err) {
                            var aa = err

                        }

          }) //end_ajax

     }) //end_click




     
     
      // $("body").delegate("[id*=delgendar]", 'click', function(){
       $('#delgendar').click( function () {

         id_evento = window.location.pathname.split('/')[2]
         idDerivacion =  window.location.pathname.split('/')[3];




           bootbox.confirm({
                                size: 'small',
                                message: "¿Está seguro de eliminar este evento?",
                                buttons: {
                                    confirm: {
                                        label: 'Si',
                                        className: 'btn-success'
                                    },
                                    cancel: {
                                        label: 'No',
                                        className: 'btn-danger'
                                    }
                                },

                                callback: function (result) {

                                    if (result) {

                                            $.ajax({
                                              url:'/ajax_del_agendar/',
                                              data: {
                                                  var1:id_evento

                                              },
                                              type: 'POST',
                                              datatype: 'json',
                                              success: function (json) {

                                                  $(location).attr('href','/calendario/'+idDerivacion);


                                                   var ruta = '/calendario/'+idDerivacion

                                                    if (window.location.pathname.includes("editar_evento_u")){

                                                        ruta = '/calendario_u/'+path3d
                                                    }

                                                    $(location).attr('href',ruta);




                                              },

                                              error: function (xhr,errmsg,err) {
                                                            var aa = err
                                                            var i = 0
                                                        }

                                          })
                                    }
                                }
                            //////
            });//end boot box
     }) //end delegate

     


     //$('#estado_evento').css("background-color", '#1111')


            
     
     //$('.myCheckbox').attr('checked', true);
     $("#otro_profesional").change(function() {
      if(this.checked) {
           //$('.vis_profesionales').attr('hidden', '');
          $("#vis_profesionales").css('visibility', 'visible')
      }else {
          $("#vis_profesionales").css('visibility', 'hidden')
      }


}); // end
     
     
     // CAMBIO DE PROFESOR, PARA ASIGNAR HORARIOS
     
    $("body").delegate("[id*=cambiarprofesional]", 'click', function(){
         id_completo = $(this).attr('id')
         id_deriv = id_completo.split('_')[1]
         rut_profesional = $('#usuarios_caae').val()
         window.location.href = "/calendario_u/" + id_deriv + "/" +  rut_profesional;
    })


$('#cp9').colorpicker({
            customClass: 'colorpicker-2x',
            sliders: {
                saturation: {
                    maxLeft: 200,
                    maxTop: 200
                },
                hue: {
                    maxTop: 200
                },
                alpha: {
                    maxTop: 200
                }
            }
        });

     //$('#cp2').colorpicker();

 }); // end documentReady


$(function() {

    });


function now()
{
  var d = new Date();
  var month = d.getMonth()+1;
  var day = d.getDate();

  var output = (day<10 ? '0' : '') + day + "-"
              + (month<10 ? '0' : '') + month + '-'
              + d.getFullYear();

  return output;
}


opcion_rechazar_deriv = ''
texto_rechazar_deriv = ''
