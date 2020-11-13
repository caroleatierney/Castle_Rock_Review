// Google Books API Key - Use key=API_KEY parameter
let apiKey = "AIzaSyBAZFHPTcUSvMx_Gx5Cd5tcQLP2c72htwA";
let author="Stephen King";
let urlPath = "https://www.googleapis.com/books/v1/volumes?q=inauthor:Stephen King&key=AIzaSyB AZFHPTcUSvMx_Gx5Cd5tcQLP2c72htwA";
let queryData=('$.query-data');

// const $details = $('<p>');

// create a results query of books
let results=[];
// let kingBook=[];

class Book {
  constructor(title, thumbnail, description, pageCount, maturityRating, fanRating, year) {
    this.title = title;
    this.thumbnail = thumbnail;
    this.description = description;
    this.pageCount = pageCount;
    this.maturityRating = maturityRating;
    this.fanRating = fanRating;
    this.year = year
  }
}

$(() => {
  $.ajax(
  {
    url: urlPath,
    Stype: "GET",
    dataType: 'json',
    data: {
      "$limit": 100
    }
  }).done(function(data) {
    // alert causing issues
    // alert("Retrieved " + data.length + " records from the dataset!");
    console.log(data);

    // ================= user input ===================
    $('.button').on('click', event => {
      event.preventDefault();

      // remove list from display and reset array
      // console.log($.queryData[0]);
      // $('.details').remove();
      // $('.query-data').remove();
      // $div.main.container.removeClass(queryData);
      // $p.removeClass('.query-data');
      // $(queryData).remove();
      // $('.query-data').remove();
      // $('.details').remove();

      // **************************************************** //
      // initialize array to empty to reset it each time
      // or just clear the details in the dom!
      // p.remove()
      // console.log($.queryData[0]);
      // $('details').remove();
      results = results.slice(results.length)
      // **************************************************** //


      // console.log("dom", document.querySelectorAll('.details'))



      // display book objects //
      // console.log(results);

      // grab the query category ID chosen and save in query
      let query = $(event.target).attr('id');

      // display what comes back from API //
      // console.log(data.items);

      //  loop through results returned
      for (var i = 0; i < data.items.length; i++) {

        //  ** create a button with this info so they can click on it and get an image from API
        //  ** add sort and date functionality
        if (data.items[i].volumeInfo.authors[0] === 'Stephen King') {

        // create a <p> of title
        let $title = $('<p>');
        $title.text(data.items[i].volumeInfo.title);

        // add an ID of isbn to <p> in case need to get more info on book
        $title.attr('id', data.items[i].volumeInfo.industryIdentifiers[0].identifier)
        $title.addClass('title');

        let title = data.items[i].volumeInfo.title;
        let thumbnail = data.items[i].volumeInfo.imageLinks.thumbnail;
        let description = data.items[i].volumeInfo.categories.description;
        let fanRating = data.items[i].volumeInfo.averageRating;
        let maturityRating = data.items[i].volumeInfo.maturityRating;
        let pageCount = data.items[i].volumeInfo.pageCount;

        // pull year out of published date
        let year = (data.items[i].volumeInfo.publishedDate).slice(0,4);

        let kingBook = new Book(title, pageCount, thumbnail, description, maturityRating, fanRating, year)

        results.push(kingBook);

        // console.log(thumbnail);

        // console.log(results[0].thumbnail);

        // set a click event on the book div just appended
        // bookDiv.on("click", clickedBook)

        // append data to display
        // const $details = $('<p>');

        // $('.query-data').append($details);
        // console.log(query.data);

        // console.log(data.items[i].volumeInfo.imageLinks.thumbnail);
        // console.log(data.items[i].volumeInfo.description);

      }; // end if King

      // console.log("image", results[1].thumbnail);

    };  // end for

    // ========== sort & display results based on button chosen ===========

    // clear the div
     $('.query-data').empty()

    // clickedBook = (event) => {


      if (query === "sorted-by-year") {
        // sort by year, title
        // referenced https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/

        results.sort((a,b) => (a.year > b.year) ? 1: -1);

        for (var i = 0; i < results.length; i++) {

          // populate the bookList div
          // const bookList = $('<div class="bookList">')
          title=results[i].title;
          fanRating=results[i].fanRating;
          year=results[i].year;
          thumbnail=results[i].thumbnail;
          description = results[i].description;

          bookImage=$('<img>').attr('src', thumbnail)

          // Update bookList with data
          // create divs to append to query-data container
          const bookList = $(`<div class='bookInfo' id='${i}'>`);

          // bookList.attr('id', i)
          // bookList.append(title);
          bookList.append(bookImage);
          // bookList.append(year);

          $bookList=bookList;
          // bookList.append(bookImage);
          // const $bookList=bookList;
          $('.query-data').append($bookList);


          // const $title = $('<p>');
          // $title.text(title)
          // $(".query-data").append(bookDiv);
          // $(".query-data").append(title);
          // $(".query-data").append($bookImage);

          // ***************************
          // console.log(thumbnail);
          // create a line with Title, Published Year and Rating concatenated
          // const $details = $('<p>');
          // $details.text(thumbnail);
          // $(".query-data").append($details);
          // $(".query-data").append($bookImageUrl);
          // add a class to aid in removing
          // $('query-data').addClass('modals')
          // $details.text("Title: " + title +  "______Published Year: " + year + "______Average Rating: " + fanRating);

          // append data to display
          // $('.query-data').append($details);


          // $('.modals').append($details);

        } // end for
      } // end if








      if (query === "maturity-rating") {
      // sort by maturity rating, title

        results.sort((a,b) => (a.maturityRating > b.maturityRating) ? 1: -1);

        for (var i = 0; i < results.length; i++) {
          title=results[i].title;
          fanRating=results[i].fanRating;
          year=results[i].year;
          maturityRating=results[i].maturityRating;

          // create a line with Title, Published Year and Rating concatenated
          const $details = $('<p>');
          $details.text("Title: " + title +  "______Maturity Rating:  " + maturityRating + "______Average Rating: " + fanRating);

          // append data to display
          $('.query-data').append($details);

        } // end for
      } // end if

      if (query === "fan-rating") {

        results.sort((a,b) => (a.fanRating < b.fanRating) ? 1: -1);

        for (var i = 0; i < results.length; i++) {
          title=results[i].title;
          fanRating=results[i].fanRating;
          year=results[i].year;
          maturityRating=results[i].maturityRating;

          // create a line with Title, Published Year and Rating concatenated
          const $details = $('<p>');
          // sort by rating
          $details.text("Title: " + title + "______Average Rating: " + fanRating);

          // append data to display
          $('.query-data').append($details);
        } // end for
      } // end if

      if (query === "number-pages") {
        // sort by number of pages
        results.sort((a,b) => (a.pageCount < b.pageCount) ? 1: -1);

        for (var i = 0; i < results.length; i++) {
          title=results[i].title;
          fanRating=results[i].fanRating;
          year=results[i].year;
          maturityRating=results[i].maturityRating;
          pageCount=results[i].pageCount;

          // create a line with Title, Published Year and Rating concatenated
          const $details = $('<p>');
          $details.text("Title: " + title +  "______Number of Pages:  " + pageCount + "______Average Rating: " + fanRating);

          // append data to display
          $('.query-data').append($details);

        } // end for
    } // end if

  // }  // end clicked event

    $('form').trigger('reset');
    });  // button function end brackets
  });

  // ================= Carousel ===================

  //get total length  which equals # children of carousel-images-container
  const totImgs=$(".book-covers").children().length-1;
  // set a counter variable to move through children
  let imgCounter=0;

  // ************ NEXT BUTTON  ************

  // create click event on class next button
  $('#next').on('click', () => {

    // hide current image
    $(".book-covers").children().eq(imgCounter).hide();

    // reset images to 0 if max has been met
    if (imgCounter < totImgs) {
       // show next image
       imgCounter++;
    }  else {
       imgCounter=0;
    }
    $(".book-covers").children().eq(imgCounter).show();
  });

  // ************ PREVIOUS BUTTON  ************
  // create click event on class prev button
  $('#prev').on('click', () => {

    // hide current image
    $(".book-covers").children().eq(imgCounter).hide();

    if (imgCounter > 0) {
      // show next image
      imgCounter--;
    } else {
      // reset images to max if reached 0
        imgCounter=totImgs;
    }

    $(".book-covers").children().eq(imgCounter).show();
  });
});  // main function end brackets

// Code Graveyard
// grab the year entered on website starting with Carrie
// let publishedYear=$('input[type="number"]').val() || 1974;
// console.log(publishedYear);

// console.log(data.items[1].volumeInfo.title);
// console.log(data.items[i].volumeInfo.industryIdentifiers[0].identifier);
// console.log(data.items[i].volumeInfo.industryIdentifiers[0]);

// https://www.googleapis.com/books/v1/volumes?q=authors=Stephen King&key=AIzaSyBAZFHPTcUSvMx_Gx5Cd5tcQLP2c72htwA

// https://www.googleapis.com/books/v1/volumes?q=+1974&inauthor:Stephen King&key=AIzaSyBAZFHPTcUSvMx_Gx5Cd5tcQLP2c72htwA

// "https://www.googleapis.com/books/v1/volumes?q=" + publishedYear + "&key=AIzaSyB AZFHPTcUSvMx_Gx5Cd5tcQLP2c72htwA"

// let devKey = "GJ71dC3xRCX9Rci3hwYqqQ";
// url: "https://www.goodreads.com/book/?"&user_id=+devKey;
// console.log(year);
// console.log(results.length);
// console.log(results[i].title);
// console.log(kingBook);
// console.log(results[i]);
// $('.query-data').append($details);
// console.log("next clicked");
// console.log("prev clicked");
// console.log(".query-data");
