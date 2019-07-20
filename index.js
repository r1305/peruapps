$(function(){
  getPersons();
});

function getPersons(){
  var xhr = $.ajax({
    method: "GET",
    url: "/person/all"
  });

  xhr.done(function(data){
    var dataSet=[]; 
    $.each(data,function(index,val){
      var _delete='<img title="Eliminar" onclick="deletePerson('+val.id+')" src="https://img.icons8.com/material/24/000000/delete-forever--v2.png">';
      var _edit="<a href='javascript:void(0)' onclick='editPerson("+val.id+")'><img src='https://img.icons8.com/android/24/000000/edit.png'></a>";
      var item=[(index+1),val.name,val.photo,_edit+_delete];
      dataSet.push(item);
    });
    $('#PersonTable').DataTable( {
      "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
      },
      destroy: true,
      data: dataSet,
      "pageLength": 10,
      "lengthChange": true,
      "info":false,
      columns: [
      { title: "#" },
      { title: "Nombre" },
      { title: "Foto" },
      { title: "" },
      ]
    });
  });
}