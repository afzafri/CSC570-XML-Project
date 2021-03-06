// load script
var xmlDoc=loadXMLDoc("cleaningservice.xml");

// get company details from XML
function getCompanyDetails()
{
  // company element
  var company = xmlDoc.getElementsByTagName("company")[0];

  // get company name
  var compname = company.getElementsByTagName("name")[0].firstChild.nodeValue;

  // get company address
  var address = company.getElementsByTagName("address")[0];
  var street = address.getElementsByTagName("street")[0].firstChild.nodeValue;
  var city = address.getElementsByTagName("city")[0].firstChild.nodeValue;
  var state = address.getElementsByTagName("state")[0].firstChild.nodeValue;
  var postcode = address.getElementsByTagName("postcode")[0].firstChild.nodeValue;

  // get company contact
  var contact = company.getElementsByTagName("contact")[0];
  // I changed the code to use nextSibling, to follow the guidelines rules by my lecturer
  var contNodeSiblings = contact.childNodes; // list all the sibling inside contact node
  var contFirstChild = contNodeSiblings[1]; // first child node element in contact node
  var phone = contFirstChild.firstChild.nodeValue;
  var email = contFirstChild.nextSibling.nextSibling.firstChild.nodeValue; // use nextSibling to access the sibling node

  // get wages rate
  var rate = company.getElementsByTagName("rate")[0].firstChild.nodeValue;
  // rate attributes
  var rateunit = company.getElementsByTagName("rate")[0].getAttribute("unit");
  var rateduration = company.getElementsByTagName("rate")[0].getAttribute("duration");

  var cardtop = "<div class='card'>"+
                  "<h4 class='card-header bg-info text-white'>"+compname+"</h4>"+
                  "<div class='card-body table-responsive'>";
  var cardbot = "</div>"+
              "</div>"+
              "<br><br>";

  // create company details table
  var companytable = "<table class='table table-bordered'>"+
    "<tr>"+
      "<th colspan='2' class='bg-info text-white'>Company Address</th>"+
      "</tr>"+
      "<tr>"+
        "<td>"+
          "<div align='center'>"+
            "Street<br>"+
            "City<br>"+
            "State<br>"+
            "Postcode<br>"+
          "</div>"+
        "</td>"+
        "<td>"+
          "<div align='center'>"+
          street+"<br>"+
          city+"<br>"+
          state+"<br>"+
          postcode+"<br>"+
        "</div>"+
        "</td>"+
      "</tr>"+
      "<tr>"+
        "<th colspan='2' class='bg-info text-white'>Company Contact</th>"+
      "</tr>"+
      "<tr>"+
        "<td>"+
          "<div align='center'>"+
            "Phone<br>"+
            "Email<br>"+
          "</div>"+
        "</td>"+
        "<td>"+
          phone+"<br>"+
          email+"<br>"+
        "</td>"+
      "</tr>"+
      "<tr>"+
        "<th class='bg-info text-white'>Cleaning Fee Rate</th>"+
        "<td>"+
          "<div align='center'>"+
            rateunit+rate+" "+rateduration+
          "</div>"+
        "</td>"+
      "</tr>"+
  "</table>";

  // get output area, and output
  $(document).ready(function(){
    // empty old data
    $("#content").empty();
    $("#schedule").empty();
    $("#content").append(cardtop + companytable + cardbot).hide().fadeIn("slow");
  });
  
}

// get list of staff
function getStaffList()
{
  // get company staff
  var staff = xmlDoc.getElementsByTagName("staff")[0];
  // manager
  var manager = staff.getElementsByTagName("manager")[0];
  var managername = manager.getElementsByTagName("name")[0].firstChild.nodeValue;
  var managercontact = manager.getElementsByTagName("contact")[0];
  var managerphone = managercontact.getElementsByTagName("phone")[0].firstChild.nodeValue;
  var manageremail = managercontact.getElementsByTagName("email")[0].firstChild.nodeValue;
  // cleaners
  var cleaners = staff.getElementsByTagName("cleaners")[0];
  var cleaner = cleaners.getElementsByTagName("cleaner");

  var cardtop = "<div class='card'>"+
                  "<h4 class='card-header bg-info text-white'>Staff List</h4>"+
                  "<div class='card-body table-responsive'>";
  var cardbot = "</div>"+
              "</div>"+
              "<br><br>";

  var stafftable = "<table class='table table-bordered'>"+
  "<tr>"+
    "<th>"+
      "Manager"+
    "</th>"+
    "<td colspan='2'>"+
      "Name: "+managername+"<br>"+
      "Phone: "+managerphone+"<br>"+
      "Email: "+manageremail+"<br>"+
    "</td>"+
  "</tr>"+
  "</table>"

  var addCleanerButton = "<button class='btn btn-primary btn-sm' data-toggle='modal' data-target='#addCleanerModal'>Add Cleaner</button>";

  var cleanerlisttable = "<br><hr>"+addCleanerButton+"<br><br><table class='table table-bordered' id='cleanerTable'>"+
                    "<thead>"+
                      "<tr>"+
                        "<th>#</th>"+
                        "<th>Cleaners</th>"+
                        "<th>Schedule</th>"+
                        "<th>Actions</th>"+
                      "</tr>"+
                    "</thead>"+
                    "<tbody>";

    for(i=0;i<cleaner.length;i++)
    {
      var cleanerIndex = i;
      var cnamenode = cleaner[i].getElementsByTagName("name")[0];
      var cleanerName = cnamenode.firstChild.nodeValue;

      cleanerlisttable += "<tr>"+
                      "<td width='10px'>"+(i+1)+"</td>"+
                      "<td>"+cleanerName+"</td>"+
                      "<td style='width:100px'><button class='btn btn-success btn-sm' onclick='getCleanersSchedule(&quot;"+cleanerName+"&quot;)'>View Schedule</button></td>"+
                      "<td style='width:150px;text-align:center'>"+
                      "<div class='btn-group' role='group'>"+
                        "<button class='btn btn-info btn-sm' onclick='openUpdateModal("+i+")'>Edit</button>"+
                        "<button class='btn btn-danger btn-sm' onclick='deleteCleaner("+i+")'>Delete</button>"+
                      "</div>"+
                      "</td>"+
                    "</tr>";
    }

  cleanerlisttable += "</tbody></table>";

   // get output area, and output
  $(document).ready(function(){
    // empty old data
    $("#content").empty();
    $("#schedule").empty(); 
    $("#content").append(cardtop + stafftable + cleanerlisttable + cardbot).hide().fadeIn("slow");
    var cleanerTable = $('#cleanerTable').DataTable(); // initialize datatables
  });
  
}

// add new cleaner node
function addCleaner(name)
{
  // get company staff
  var staff = xmlDoc.getElementsByTagName("staff")[0];
  // cleaners
  var cleaners = staff.getElementsByTagName("cleaners")[0];

  newCleaner = xmlDoc.createElement("cleaner"); // create new cleaner node 
  newName = xmlDoc.createElement("name"); // create new name node
  newNameValue = xmlDoc.createTextNode(name); // create new name text node
  newName.appendChild(newNameValue); // add the text node into name node
  newCleaner.appendChild(newName); // add name node into cleaner node

  cleaners.appendChild(newCleaner); // add cleaner node into cleaners node

  // clear input text and close modal
  document.getElementById("cleanerName").value = "";
  $("#addCleanerModal").modal('hide');

  // re-call function, to display new result
  getStaffList();
}

// open update modal form
function openUpdateModal(index)
{
  document.getElementById("cleanerUpdId").value = index; // set cleaner array index
  $("#updateCleanerModal").modal('show');
}

// update cleaner's name
function updateCleaner(newName, index)
{
  // get company staff
  var staff = xmlDoc.getElementsByTagName("staff")[0];
  // cleaners
  var cleaners = staff.getElementsByTagName("cleaners")[0];
  var cleaner = cleaners.getElementsByTagName("cleaner");

  var originalName = cleaner[index].getElementsByTagName("name")[0].firstChild.nodeValue;

  // update new cleaner name for staff list
  var cnamenode = cleaner[index].getElementsByTagName("name")[0];
  cnamenode.firstChild.nodeValue = newName;

  // update new cleaner name in all schedules
  updAllName(originalName, newName);

  // clear data and close modal
  document.getElementById("NewcleanerName").value = "";
  document.getElementById("cleanerUpdId").value = "";
  $("#updateCleanerModal").modal('hide');

  // re-call function, to display new result
  getStaffList();
}

// update cleaner name in schedules
function updAllName(originalName, newName)
{
  // update new cleaner name in all schedules
  // houses element
  var houses = xmlDoc.getElementsByTagName("houses")[0];
  var house = houses.getElementsByTagName("house");

  for(i=0;i<house.length;i++)
  {
    // day element
    var days = house[i].getElementsByTagName("day");

    for(j=0;j<days.length;j++)
    {
      var daycleaner = days[j].getElementsByTagName("cleaner")[0].firstChild.nodeValue;

      // only replace name for specific cleaner
      if(daycleaner == originalName)
      {
        days[j].getElementsByTagName("cleaner")[0].firstChild.nodeValue = newName;
      }
    }
  }
}

// delete cleaner node 
function deleteCleaner(index)
{
  // get company staff
  var staff = xmlDoc.getElementsByTagName("staff")[0];
  // cleaners
  var cleaners = staff.getElementsByTagName("cleaners")[0];
  var cleaner = cleaners.getElementsByTagName("cleaner");

  var originalName = cleaner[index].getElementsByTagName("name")[0].firstChild.nodeValue;

  // remove the node
  var removedNode = cleaners.removeChild(cleaner[index]);

  // since the cleaner is removed, delete the schedule
  delCleanerSchedule(originalName);

  // re-call function, to display new result
  getStaffList();
}

// delete cleaner schedule of specific cleaner
function delCleanerSchedule(cleanerName)
{
  // houses element
  var houses = xmlDoc.getElementsByTagName("houses")[0];
  var house = houses.getElementsByTagName("house");

  for(i=0;i<house.length;i++)
  {
    // day element
    var days = house[i].getElementsByTagName("day");

    for(j=0;j<days.length;j++)
    {
      var daycleaner = days[j].getElementsByTagName("cleaner")[0].firstChild.nodeValue;

      // only delete schedule of specific cleaner
      if(daycleaner == cleanerName)
      {
        days[j].parentNode.removeChild(days[j]);
      }
    }
  }
}

// get list of houses from XML
function getHouseList()
{
  // houses element
  var houses = xmlDoc.getElementsByTagName("houses")[0];

  var house = houses.getElementsByTagName("house");

  // get wages rate
  var wagesRate = houses.parentNode.getElementsByTagName("rate")[0].firstChild.nodeValue;

  var cardtop = "<div class='card'>"+
                  "<h4 class='card-header bg-info text-white'>House List</h4>"+
                  "<div class='card-body table-responsive'>";
  var cardbot = "</div>"+
              "</div>"+
              "<br><br>";

  var housetable = "<table class='table table-bordered' id='houseTable'>"+
  "<thead><tr class='bg-info text-white'>"+
    "<th>#</th>"+
    "<th>Owner</th>"+
    "<th>Address</th>"+
    "<th>Type</th>"+
    "<th>Hire Date</th>"+
    "<th>Total Wages</th>"+
    "<th>View Schedule</th>"+
  "</tr></thead><tbody>";

  for(i=0;i<house.length;i++)
  {
    var houseIndex = i;

    // get house type attribute
    var housetype =  house[i].getAttribute("type");

    // get house address
    var haddress = house[i].getElementsByTagName("address")[0];
    var hstreet = haddress.getElementsByTagName("street")[0].firstChild.nodeValue;
    var hcity = haddress.getElementsByTagName("city")[0].firstChild.nodeValue;
    var hstate = haddress.getElementsByTagName("state")[0].firstChild.nodeValue;
    var hpostcode = haddress.getElementsByTagName("postcode")[0].firstChild.nodeValue;

    var fullAddress = hstreet+", "+hpostcode+" "+hcity+", "+hstate;

    // get house owner
    var howner = house[i].getElementsByTagName("owner")[0];
    var hname = howner.getElementsByTagName("name")[0].firstChild.nodeValue;
    var hcontact = howner.getElementsByTagName("contact")[0];
    var hphone = hcontact.getElementsByTagName("phone")[0].firstChild.nodeValue;
    var hemail = hcontact.getElementsByTagName("email")[0].firstChild.nodeValue;

    var houseOwnerContact = "Name: "+hname+"<br>Phone: "+hphone+"<br>Email: "+hemail;

    // get house hire date
    var hiredate = house[i].getElementsByTagName("date")[0];
    var start_date = hiredate.getElementsByTagName("start_hire")[0].firstChild.nodeValue;
    var end_date = hiredate.getElementsByTagName("end_hire")[0].firstChild.nodeValue;  

    housetable += "<tr>"+
    "<td>"+(i+1)+"</td>"+
    "<td>"+houseOwnerContact+"</td>"+
    "<td>"+fullAddress+"</td>"+
    "<td>"+toInitUpperCase(housetype)+"</td>"+
    "<td>"+
      "<table class='table table-bordered'>"+
        "<tr class='bg-info text-white'>"+
          "<th>Start Date</th>"+
          "<th>End Date</th>"+
        "</tr>"+
        "<tr>"+
          "<td>"+start_date+"</td>"+
          "<td>"+end_date+"</td>"+
        "</tr>"+
      "</table>"+
    "</td>"+
    "<td align='center'>RM"+calcTotalWages(houseIndex,wagesRate)+"</td>"+
    "<td><button class='btn btn-success btn-sm' onclick='getSchedule("+houseIndex+")'>View Schedule</button></td>"+
  "</tr>";
  }

  housetable += "</tbody></table>";

   // get output area, and output
  $(document).ready(function(){
    // empty old data
    $("#content").empty();
    $("#schedule").empty();
    $("#content").append(cardtop + housetable + cardbot).hide().fadeIn("slow");
    var houseTable = $('#houseTable').DataTable(); // initialize datatables
  });
}

// calculate the total fare wages for each house
function calcTotalWages(index,rate)
{
  var totalWages = 0.0;
  var twhouses = xmlDoc.getElementsByTagName("houses")[0];
  var twhouse = twhouses.getElementsByTagName("house");

  var hmonth = twhouse[index].getElementsByTagName("month");

  for(x=0;x<hmonth.length;x++)
  {
    var hday = hmonth[x].getElementsByTagName("day");

    for(j=0;j<hday.length;j++)
    {
      var hdurationnode = hday[j].getElementsByTagName("duration")[0];
      var hduration = hdurationnode.firstChild.nodeValue;
      totalWages += parseFloat(hduration) * rate;
    }
  }
  return totalWages;
}

// get fare rate
function getFareRate()
{
	// company element
	var company = xmlDoc.getElementsByTagName("company")[0];
	// get wages rate
	var rate = company.getElementsByTagName("rate")[0].firstChild.nodeValue;
	return rate;
}

// get the list of schedule for each house
function getSchedule(index)
{
  var string = "";
  var houses = xmlDoc.getElementsByTagName("houses")[0];
  var house = houses.getElementsByTagName("house");	

  var hownername = house[index].getElementsByTagName("owner")[0].getElementsByTagName("name")[0].firstChild.nodeValue;
  string += "<h3>House owner: "+hownername+"</h3>";

  var hmonth = house[index].getElementsByTagName("month");
  
  for(i=0;i<hmonth.length;i++)
  {
    var monthname = hmonth[i].getAttribute("name");
    var totalfaremonth = 0.0;

    var cardtop = "<div class='card'>"+
                  "<h4 class='card-header bg-info text-white'>"+toInitUpperCase(monthname)+"</h4>"+
                  "<div class='card-body'>";
    var cardbot = "</div>"+
              "</div>"+
              "<br><br>";

    string += cardtop;

    var hweek = hmonth[i].getElementsByTagName("week");

    for(j=0;j<hweek.length;j++)
    {
      var totalfareweek = 0.0;
      string += "<b>Week #"+(j+1)+"</b><br>";
      string += "<table class='table table-bordered table-responsive'>"+
                "<tr class='bg-info text-white'>"+
                   "<th>Day & Date</th>"+
                   "<th>Cleaning Duration</th>"+
                   "<th>Cleaner</th>"+
                   "<th>Fare</th>"+
                "</tr>";


      var hdaynode = hweek[j].getElementsByTagName("day");
      for(z=0;z<hdaynode.length;z++)
      {
        var hdayname = hdaynode[z].getAttribute("name");
        var daydate = hdaynode[z].getElementsByTagName("date")[0].firstChild.nodeValue;
        var dayduration = hdaynode[z].getElementsByTagName("duration")[0].firstChild.nodeValue;
        var durationunit = hdaynode[z].getElementsByTagName("duration")[0].getAttribute("unit");
        var daycleaner = hdaynode[z].getElementsByTagName("cleaner")[0].firstChild.nodeValue;
        var rateperday = parseFloat(dayduration) * getFareRate();
        totalfareweek += parseFloat(rateperday);

        string += "<tr>"+
                    "<td>"+toInitUpperCase(hdayname)+"<br>"+daydate+"</td>"+
                    "<td>"+dayduration+" "+durationunit+"</td>"+
                    "<td>"+daycleaner+"</td>"+
                    "<td>RM"+rateperday+"</td>"+
                  "</tr>";

      }

      string += "<tr>"+
      				"<th colspan='3' align='right'>TOTAL</th>"+
      				"<td>RM"+totalfareweek+"</td>"+
      			"</tr>";


      string += "</table><br>";
      totalfaremonth += parseFloat(totalfareweek);
    }
    string += "Total fare for the month: <b>RM"+totalfaremonth+"</b><br>";
    string += cardbot;
  }

  // get output area, and output
  $(document).ready(function(){
    // empty old data
    $("#schedule").empty();
    $("#schedule").append(string).hide().fadeIn("slow");
  });

  $(document).ready(function(){
    $('#scheduleModal').modal('show');
  });
}

// get the list of schedule for specific cleaner
function getCleanersSchedule(cleanerName)
{
  var string = '';
  string += "<table class='table table-bordered table-responsive'>"+
                "<tr class='bg-info text-white'>"+
                   "<th>#</th>"+
                   "<th>Day & Date</th>"+
                   "<th>Cleaning Duration</th>"+
                   "<th>Cleaner</th>"+
                   "<th>Fare</th>"+
                   "<th>House Owner</th>"+
                   "<th>House Address</th>"+
                   "<th>House Type</th>"+
                "</tr>";

  // houses element
  var houses = xmlDoc.getElementsByTagName("houses")[0];
  var house = houses.getElementsByTagName("house");
  var count = 1;

  for(i=0;i<house.length;i++)
  {
      // get house type attribute
      var housetype =  house[i].getAttribute("type");

      // get house address
      var haddress = house[i].getElementsByTagName("address")[0];
      var hstreet = haddress.getElementsByTagName("street")[0].firstChild.nodeValue;
      var hcity = haddress.getElementsByTagName("city")[0].firstChild.nodeValue;
      var hstate = haddress.getElementsByTagName("state")[0].firstChild.nodeValue;
      var hpostcode = haddress.getElementsByTagName("postcode")[0].firstChild.nodeValue;
      var fullAddress = hstreet+", "+hpostcode+" "+hcity+", "+hstate;

      // get house owner
      var howner = house[i].getElementsByTagName("owner")[0];
      var hname = howner.getElementsByTagName("name")[0].firstChild.nodeValue;
      var hcontact = howner.getElementsByTagName("contact")[0];
      var hphone = hcontact.getElementsByTagName("phone")[0].firstChild.nodeValue;
      var hemail = hcontact.getElementsByTagName("email")[0].firstChild.nodeValue;

      var houseOwnerContact = "Name: "+hname+"<br>Phone: "+hphone+"<br>Email: "+hemail;

      // day element
      var days = house[i].getElementsByTagName("day");

      for(j=0;j<days.length;j++)
      {
        var hdayname = days[j].getAttribute("name");
        var daydate = days[j].getElementsByTagName("date")[0].firstChild.nodeValue;
        var dayduration = days[j].getElementsByTagName("duration")[0].firstChild.nodeValue;
        var durationunit = days[j].getElementsByTagName("duration")[0].getAttribute("unit");
        var daycleaner = days[j].getElementsByTagName("cleaner")[0].firstChild.nodeValue;
        var rateperday = parseFloat(dayduration) * getFareRate();

        // only fetch data for that specific cleaner
        if(daycleaner == cleanerName)
        {
          string += "<tr>"+
                    "<td>"+count+"</td>"+
                    "<td>"+toInitUpperCase(hdayname)+"<br>"+daydate+"</td>"+
                    "<td>"+dayduration+" "+durationunit+"</td>"+
                    "<td>"+daycleaner+"</td>"+
                    "<td>RM"+rateperday+"</td>"+
                    "<td>"+houseOwnerContact+"</td>"+
                    "<td>"+fullAddress+"</td>"+
                    "<td>"+toInitUpperCase(housetype)+"</td>"+
                  "</tr>";
          count++;
        }
      }
  }

  string += "</table>";

  // get output area, and output
  $(document).ready(function(){
    // empty old data
    $("#schedule").empty();
    $("#schedule").append(string).hide().fadeIn("slow");
  });

  $(document).ready(function(){
    $('#scheduleModal').modal('show');
  });
}

// function for capitalize initial letter
function toInitUpperCase(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// set navbar item as active onclick
$(document).ready(function(){
  $(".nav-item").click(function(){
    $(".nav-item").removeClass('active');
    $(this).addClass('active');
  })
  $("#firstNavItem").addClass('active'); // set first nav item as active
});