// $(document).ready(()=>{
//     // alert("you are ready");

// })
$("#postTextarea").keyup((event)=>
{
    var textbox=$(event.target);
    var value =textbox.val().trim();
    console.log(value);
    var submitbutton =$("#submitPostButton");
    if(submitbutton.length==0)
    {
        return alert("No submit button found");
    }
       if(value==""){
       submitbutton.prop("disabled",true);
       return;
       }
       submitbutton.prop("disabled",false);
})
$("#submitPostButton").click((event)=>
{
     var button = $(event.target);
     var textbox =$("#postTextarea");


     var data = {
        content:textbox.val() 
     }
     $.post("/api/posts ",data,(postdata)=>{
        
        var html = createPostHtml(postdata);
        $(".postsContainer").prepend(html);
        textbox.val("");
        button.prop("disabled",true);


      // console.log(postdata);
      // alert(postdata);
     }
    //  xhr xml http request
    // $.post is a ajax code

 ) })
  
   function createPostHtml(postdata)
   {
    
     var postedBy = postdata.postedBy;
     if(postedBy._id==undefined){
        return console.log("User object is not populated");
     }
     var displayName=postedBy.firstName +" "+postedBy.lastName;
     var timestamp =postedBy.createdAt;

    return `<div class="post">
        <div class="mainContentContainer">
            <div class="userImageContainer">
                <img src ="${postedBy.profilepic}">
        </div>
        <div class="postContentContainer">
            <div class="header">
                <a href="/profile/${postedBy.userName}" class="displayName">${displayName}</a>
                <span class = 'userName'>${postedBy.userName}</span>
                <span class = 'userName'>${timestamp}</span>

            </div>
            <div class="postBody">
                <span>${postdata.content}</span>
            </div>
            <div class="postFooter">
             <div class="postButtonContainer">
             <button>
                    <i class="fa-solid fa-comments-dollar"></i>
                    
             </button></div>
             <div class="postButtonContainer">
             <button>
                    <i class="fa-solid fa-repeat"></i>
                    
             </button></div>
             <div class="postButtonContainer">
             <button>
                    <i class="fa-regular fa-heart"></i>
             </button></div>
            </div>
        </div>
    </div>
    </div>`;
    // double ticks you can inject variable in javascript
    //you can use jquery as well

   }
