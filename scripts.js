var locationSearch = "";
var descriptionsearch =""
function findjobs(){
    // read email by querySelector API
    let location = document.querySelector("#location").value;
    let description = document.querySelector("#description").value;
    descriptionsearch = description;
    locationSearch = location;
    
    if(!location || location === " ") alert("Please enter the location");
    else if(!description || description === " ") alert("Please enter job description");
    // query URL
    else{
        var queryURL = `http://127.0.0.1:3000/${location}/${description}`
    
    // make AJAX request using fetch API
    fetch(queryURL)
        .then(function (response) {
            //return response;
            return response.json();
        })
        .then(function (result) {
            displayLocationResult(result);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

function displayLocationResult(result) {
    // get message div
    console.log(result);
    let msgDiv = document.querySelector("#message");
    // select result div
    let div = document.querySelector("#result");

    if (result.message) {
        // clear contents
        div.innerHTML = "";

        
        msgDiv.innerHTML = `<div class="alert alert-danger alert-dismissible" role="alert"> \
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> \
                                <strong>oops!</strong> ${result.message} \
                            </div>`;    
    }
    else if(result.length === 0) {
        msgDiv.innerHTML = `<div class="alert alert-danger alert-dismissible" role="alert"> \
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> \
                                <h3>No jobs !!<h3> \
                            </div>`;
    }
    else {
        // display success
        msgDiv.innerHTML = `<div class="alert alert-success alert-dismissible" role="alert"> \
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> \
                                <h4>Jobs in ${locationSearch} of ${descriptionsearch}<h4> \
                            </div>`;
        
        // clear contents
        div.innerHTML = "";


        for(let i=0; i<result.length; i++) {
            let hackedHTMLDiv = `<div class="jumbotron" id="id_${i}"> \
                                    <div class="row">
                                    <h3>Date: <h5  style="color:green"><a href="${result[i].company_url}">${result[i].created_at}</a></h5></h3>
                                        <div class="col-xs-12 col-sm-6" style="text-align:center">
                                            <img height="200px" width="200px" src="${result[i].company_logo}">
                                            <h1>Company : <h2 style="color:blue">${result[i].company}</a></h5></h3>
                                            <h3>Post : <h5 style="color:blue">${result[i].title}</a></h5></h3>
                                            <h3>Job type : <h5 style="color:blue">${result[i].type}</h5></hh3>
                                            <h3>Company location : <h5 style="color:blue">${result[i].location}</h5></h3>
                                        </div>
                                        <div>
                                            <h3>Description: <h5 style="color:blue">${result[i].description}</h5></h3>
                                        </div>
                                    </div>
                                </div>`;
            $("#result").append(hackedHTMLDiv);
        }

        console.log(result);
    }
}
