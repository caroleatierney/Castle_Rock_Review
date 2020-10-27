# castlerockreview

# caroleatierney.github.io
Personal Git Repo


Link to Castle Rock Review app
https://caroleatierney.github.io/castle_rock/

The app I created uses the following technologies:
  HTML
  CSS
  JQuery
  javascript
  AJAX

  Unsolved problems:
  - Cannot get the JQuery remove statement to work, so the list keeps building onto itself
  - Cannot get my images folder up to github so they are not displaying.
  - some CSS formatting

My application uses AJAX to retrieve data from the google books API.  

The get statement is filtered to retrieve only Steven King books.  Even though I have this filter on, there was a book about Stephen King by another author, so I included another statement to make sure this was not included in my data.

There are buttons for the reader to select that will display the information I pulled sorted by title, maturity rating, fan rating  and number of pages.  I had problems putting multiple spaces in my concatenated output so I used underscores.


I learned and used a new sort statement with a function in it to sort based on different key pairs in my array of book elements.

This is the sort command I used:
results.sort((a,b) =>
(a.pageCount < b.pageCount) ? 1: -1);
This sorted by total number of pages.  The function returns a positive, negative or zero number.

The +1 means true.
The -1 means false.

You can reverse the order by switching the operator or the 1's in the function.

I have a carousel that displays numerous books written by Stephen King that take place in his fictional town of Castle Rock, Maine.  I had a lot of trouble getting my 1st image to not show up and to get my other images to hide.  It worked only after I moved the code around in my css.
<<<<<<< HEAD
=======

Definitely got to the point where I just wanted to get it done and should have made it cleaner.

Lost a lot of changes with something I did i Git!
>>>>>>> 2c0d0354a566da42bd91fe7f272c424df340d135
