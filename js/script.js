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
  var phone = contact.getElementsByTagName("phone")[0].firstChild.nodeValue;
  var email = contact.getElementsByTagName("email")[0].firstChild.nodeValue;

  // get wages rate
  var rate = company.getElementsByTagName("rate")[0].firstChild.nodeValue;
  // rate attributes
  var rateunit = company.getElementsByTagName("rate")[0].getAttribute("unit");
  var rateduration = company.getElementsByTagName("rate")[0].getAttribute("duration");

  var cardtop = "<div class='card'>"+
                  "<h4 class='card-header bg-info text-white'>Company Details</h4>"+
                  "<div class='card-body'>";
  var cardbot = "</div>"+
              "</div>"+
              "<br><br>";

  // create company details table
  var companytable = "<table border='1' style='border-collapse='collapse''>"+
  "<tr>"+
    "<th colspan='5' bgcolor='aqua'>"+compname+"</th>"+          
  "</tr>"+
  "<tr>"+
    "<td colspan='2'>"+
      "Company Address<br></br>"+
      "<div align='center'>"+
        "Street<br></br>"+
        "City<br></br>"+
        "State<br></br>"+
        "Postcode<br></br>"+
      "</div>"+
      "Company Contact<br></br>"+
      "<div align='center'>"+
        "Phone<br></br>"+
        "Email<br></br>"+
      "</div>"+
      "Cleaning Fee Rate"+
    "</td> "+
    "<td colspan='3' align='right'>"+
      "<div align='left'>"+
       "<br></br>"+
      "<div align='center'>"+
        street+"<br></br>"+
        city+"<br></br>"+
        state+"<br></br>"+
        postcode+"<br></br>"+
      "</div>"+
     "<br></br>"+
      "<div align='center'>"+
        phone+"<br></br>"+
        email+"<br></br>"+
        rateunit+rate+" "+rateduration+
      "</div>"+
      "</div>"+
    "</td>  "+       
  "</tr>"+
"</table>";

  // clear schedule output
  var schedule = document.getElementById("schedule");
  schedule.innerHTML = "";

  // get output area
  var content = document.getElementById("content");
  content.innerHTML = cardtop + companytable + cardbot;
  
}

// get list of staff
function getStaffList()
{
  // company element
  var company = xmlDoc.getElementsByTagName("company")[0];

  // get company staff
  var staff = company.getElementsByTagName("staff")[0];
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
                  "<div class='card-body'>";
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
  "<tr>"+
    "<th rowspan='"+(cleaner.length)+"'>"+
      "Cleaners"+
    "</th>";

    for(i=0;i<cleaner.length;i++)
    {
      var cleanerIndex = i;
      var cnamenode = cleaner[i].getElementsByTagName("name")[0];

      if(i>0)
      {
        stafftable += "<tr>";
      }

      stafftable += "<td>"+(i+1)+". "+cnamenode.firstChild.nodeValue+"</td>"+
                      "<td style='width:100px'><button class='btn btn-success btn-sm' onclick='getCleanersSchedule("+cleanerIndex+")'>View Schedule</button></td>"+
                    "</tr>";
    }

  stafftable += "</table>";

  // clear schedule output
  var schedule = document.getElementById("schedule");
  schedule.innerHTML = "";

  // get output area
  var content = document.getElementById("content");
  content.innerHTML = cardtop + stafftable + cardbot;
  
}

// get list of houses from XML
function getHouseList()
{
  // houses element
  var houses = xmlDoc.getElementsByTagName("houses")[0];

  // get company address
  var house = houses.getElementsByTagName("house");

  // get wages rate
  var wagesRate = xmlDoc.getElementsByTagName("company")[0].getElementsByTagName("rate")[0].firstChild.nodeValue;

  var cardtop = "<div class='card'>"+
                  "<h4 class='card-header bg-info text-white'>House List</h4>"+
                  "<div class='card-body'>";
  var cardbot = "</div>"+
              "</div>"+
              "<br><br>";

  var housetable = "<table class='table table-bordered'>"+
  "<tr class='bg-info text-white'>"+
    "<th>#</th>"+
    "<th>Owner</th>"+
    "<th>Address</th>"+
    "<th>Type</th>"+
    "<th>Hire Date</th>"+
    "<th>Total Wages</th>"+
    "<th>View Schedule</th>"+
  "</tr>";

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
    "<td>"+housetype.toUpperCase()+"</td>"+
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

  housetable += "</table>";

  // get output area
  var content = document.getElementById("content");
  content.innerHTML = cardtop + housetable + cardbot;
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
                  "<h4 class='card-header bg-info text-white'>"+monthname+"</h4>"+
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
      string += "<table class='table table-bordered'>"+
                "<tr class='bg-info text-white'>"+
                   "<th>Day</th>"+
                   "<th>Date</th>"+
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
        var daycleaner = hdaynode[z].getElementsByTagName("cleaner")[0].firstChild.nodeValue;
        var rateperday = parseFloat(dayduration) * getFareRate();
        totalfareweek += parseFloat(rateperday);

        string += "<tr>"+
                    "<td>"+hdayname+"</td>"+
                    "<td>"+daydate+"</td>"+
                    "<td>"+dayduration+"</td>"+
                    "<td>"+daycleaner+"</td>"+
                    "<td>RM"+rateperday+"</td>"+
                  "</tr>";

      }

      string += "<tr>"+
      				"<th colspan='4' align='right'>TOTAL</th>"+
      				"<td>RM"+totalfareweek+"</td>"+
      			"</tr>";


      string += "</table><br>";
      totalfaremonth += parseFloat(totalfareweek);
    }
    string += "Total fare for the month: <b>RM"+totalfaremonth+"</b><br>";
    string += cardbot;
  }

  $(document).ready(function(){
    $('#scheduleModal').modal('show');
  });

  // get output area
  var schedule = document.getElementById("schedule");
  schedule.innerHTML = string;
}

// set navbar item as active onclick
$(document).ready(function(){
  $(".nav-item").click(function(){
    $(".nav-item").removeClass('active');
    $(this).addClass('active');
  })
  $("#firstNavItem").addClass('active'); // set first nav item as active
});