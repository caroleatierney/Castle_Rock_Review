// Google Books API Key - Use key=API_KEY parameter
let apiKey = "AIzaSyBAZFHPTcUSvMx_Gx5Cd5tcQLP2c72htwA";
let author="Stephen King";
let urlPath = "https://www.googleapis.com/books/v1/volumes?q=inauthor:Stephen King&key=AIzaSyB AZFHPTcUSvMx_Gx5Cd5tcQLP2c72htwA";
let queryData=('$.query-data');

// create a results query of books
let results=[];

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

      // initialize array to empty to reset it each time
      results = results.slice(results.length)

      // display book objects
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

        kingBook = new Book(title, thumbnail, description, pageCount, maturityRating, fanRating, year)

        // *** can I access kingBook array later?
        // *** why am I not getting more books?
        // *** why is there so much in line 86
        results.push(kingBook);

        // console.log(results);
        // console.log(results[0]);
        // console.log(query.data);
        // console.log(data.items[i].volumeInfo.imageLinks.thumbnail);
        // console.log(data.items[i].volumeInfo.description);

      }; // end if King
    };  // end for

    // ========== sort & display results based on button chosen ===========

    // clear the div before adding
     $('.query-data').empty()

    // sort results: referenced https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/

    // sort by year, title
    if (query === "sorted-by-year") {
      results.sort((a,b) => (a.year > b.year) ? 1: -1);
    // sort by maturity rating, title
    } else if (query === "maturity-rating") {
      results.sort((a,b) => (a.maturityRating > b.maturityRating) ? 1: -1);
    // sort by fan-rating, title
    } else if (query === "fan-rating") {
      results.sort((a,b) => (a.fanRating < b.fanRating) ? 1: -1);
    // sort by number of pages, title
    } else if (query === "number-pages") {
      // sort by number of pages
      results.sort((a,b) => (a.pageCount < b.pageCount) ? 1: -1);
    }

    // populate book div
    for (var i = 0; i < results.length; i++) {
      const bookList = $(`<div class='bookList' id='${i}'>`);
      const bookButton= $(`<button class="open">Open</button>`);

      title=results[i].title;
      fanRating=results[i].fanRating;
      year=results[i].year;
      thumbnail=results[i].thumbnail;
      description = results[i].description;

      bookImage=$('<img>').attr('src', thumbnail);

      // append booklist div to query-data container
      bookList.append(title);
      bookList.append(bookImage);
      bookList.append(bookButton);
      $('.query-data').append(bookList);
    }

    $(".open").on("click", function () {
      $(".popup-body, .popup-content").addClass("active");

      // console.log(results);
      // console.log(results[0].title);

      // clear the div before adding
      $('.popup-content').empty()

      let test=$('<h1>test stuff shows up</h1>')
      $('.popup-content').append(test);

      let button=$('<button class="close">Close</button>')
      $('.popup-content').append(button);
    });

    $(".close, .popup-body").on("click", function () {
      $(".popup-body, .popup-content").removeClass("active");
    });

  });

  // ==================================================
  // ================ modal handling ==================
  // ==================================================
  $(".open").on("click", function () {
    $(".popup-body, .popup-content").addClass("active");

    // console.log(results);
    // console.log(results[0].title);

    // clear the div before adding
    $('.popup-content').empty()

    let test=$('<h1>test stuff shows up</h1>')
    $('.popup-content').append(test);

    let button=$('<button class="close">Close</button>')
    $('.popup-content').append(button);
  });

  $(".close, .popup-body").on("click", function () {
    $(".popup-body, .popup-content").removeClass("active");
  });
  // ==================================================

    // $('.bookList').on('click', (event) => {
      // const bookListId = $(event.currentTarget).attr('id')

      // get info from array by id #

      console.log(results);

      // let $titleName = results[0].title;
      // let $title = $(`<h2>${titleName}</h2>`)

      // let thumbnail = data.items[i].volumeInfo.imageLinks.thumbnail;
      // let description = data.items[i].volumeInfo.categories.description;
      // let fanRating = data.items[i].volumeInfo.averageRating;
      // let maturityRating = data.items[i].volumeInfo.maturityRating;
      // let pageCount = data.items[i].volumeInfo.pageCount;
      // let year = (data.items[i].volumeInfo.publishedDate).slice(0,4);

      // const clickedBook = $('moreInfo')
      // .append($title)

      // $('.moreInfo').toggle()
    // })

    // $('#close').on('click', () => {
      // $('.modal').hide()
      // $('.moreInfo').empty()
    // })






    // }  // end clicked event

    // $('form').trigger('reset');
  });  // modal end brackets
  // });

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
