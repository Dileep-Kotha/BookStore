const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 259, image: "https://hachette.imgix.net/books/9780762498130.jpg?auto=compress,format" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", price: 299, image: "https://cdn2.penguin.com.au/covers/original/9781785150357.jpg" },
    { id: 3, title: "1984", author: "George Orwell", price: 649, image: "https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,fl_progressive,q_auto,w_1024/64c78717dbf9e1001d096f33.jpg" },
    { id: 4, title: "Moby-Dick", author: "Herman Melville", price: 559, image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1668059793i/63268593.jpg" },
    { id: 5, title: "Pride and Prejudice", author: "Jane Austen", price: 795, image: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781471134746/pride-and-prejudice-9781471134746_hr.jpg" },
    { id: 6, title: "The Hobbit", author: "J.R.R. Tolkien", price: 499, image: "https://i.pinimg.com/736x/94/b4/09/94b409c711bf8618e78c624765a3c0b9--hobbit-book-the-hobbit.jpg" },
    { id: 7, title: "War and Peace", author: "Leo Tolstoy", price: 375, image: "https://cdn.kobo.com/book-images/3ac03eac-d437-47e3-9b15-52542edabd56/353/569/90/False/war-and-peace-34.jpg" },
    { id: 8, title: "The Catcher in the Rye", author: "J.D. Salinger", price: 950, image: "https://cdn.britannica.com/94/181394-050-2F76F7EE/Reproduction-cover-edition-The-Catcher-in-the.jpg" },
    { id: 9, title: "Jane Eyre", author: "Charlotte Brontë", price: 525, image: "https://static.faber.co.uk/wp-content/uploads/2022/09/Jane-Eyre.jpg" },
    { id: 10, title: "Brave New World", author: "Aldous Huxley", price: 325, image: "https://cdn.kobo.com/book-images/b75f696b-495b-45b7-b94d-dd6d1dfcf52d/1200/1200/False/brave-new-world-12.jpg" },
    { id: 11, title: "The Alchemist", author: "Paulo Coelho", price: 199, image: "https://cdn.kobo.com/book-images/5967e7fb-edc8-403b-9989-f8aab7b3ed89/1200/1200/False/the-alchemist-38.jpg" },
    { id: 12, title: "Frankenstein", author: "Mary Shelley", price: 675, image: "https://i.pinimg.com/originals/e1/1a/42/e11a42335564aa23365036d414be32a0.jpg" }
  ];
  
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  
  function updateCounts() {
    $('#cart-count').text(cart.length);
    $('#wishlist-count').text(wishlist.length);
  }
  
  function saveData() {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }
  
  function renderBooks() {
    const $list = $('#book-list').empty();
    books.forEach(book => {
      const bookHtml = `
        <article class="book" data-id="${book.id}">
          <img src="${book.image}" alt="${book.title}">
          <h3>${book.title}</h3>
          <p>Author: ${book.author}</p>
          <p>Price: $${book.price.toFixed(2)}</p>
          <button class="add-to-cart">Add to Cart</button>
          <button class="add-to-wishlist wishlist">Wishlist</button>
        </article>
      `;
      $list.append(bookHtml);
    });
  }
  
  function addToCart(id) {
    if (!cart.includes(id)) {
      cart.push(id);
      saveData();
      updateCounts();
      alert("Added to cart!");
    }
  }
  
  function addToWishlist(id) {
    if (!wishlist.includes(id)) {
      wishlist.push(id);
      saveData();
      updateCounts();
      alert("Added to wishlist!");
    }
  }

  function removeFromCart(id) {
    cart = cart.filter(bookId => bookId !== id);
    saveData();
    updateCounts();
    renderCart();
  }
  
  function removeFromWishlist(id) {
    wishlist = wishlist.filter(bookId => bookId !== id);
    saveData();
    updateCounts();
    renderWishlist();
  }




  
  function openModal(type) {
    const data = type === 'cart' ? cart : wishlist;
    const title = type === 'cart' ? 'Your Cart' : 'Your Wishlist';
    const $list = $('#modal-list').empty();
    $('#modal-title').text(title);
  
    if (data.length === 0) {
      $list.append(`<li>No items yet.</li>`);
    } else {
      data.forEach(id => {
        const book = books.find(b => b.id === id);
        $list.append(`<li>${book.title} - $${book.price.toFixed(2)}
        <button class="remove" onclick="removeFrom${type.charAt(0).toUpperCase() + type.slice(1)}(${book.id})">Remove</button>
        </li>`);
      });
    }
  
    $('#modal').fadeIn();
  }
  
  $(document).ready(function () {
    renderBooks();
    updateCounts();
  
    $('#book-list').on('click', '.add-to-cart', function () {
      const id = parseInt($(this).closest('.book').data('id'));
      addToCart(id);
    });
  
    $('#book-list').on('click', '.add-to-wishlist', function () {
      const id = parseInt($(this).closest('.book').data('id'));
      addToWishlist(id);
    });
  
    $('nav').on('click', 'a', function (e) {
      const text = $(this).text();
      if (text.includes('Cart')) openModal('cart');
      else if (text.includes('Wishlist')) openModal('wishlist');
      e.preventDefault();
    });
  
    $('#search').on('input', function () {
      const query = $(this).val().toLowerCase();
      $('.book').each(function () {
        const title = $(this).find('h3').text().toLowerCase();
        $(this).toggle(title.includes(query));
      });
    });
  
    $('.close, #modal').on('click', function (e) {
      if (e.target === this) {
        $('#modal').fadeOut();
      }
    });
  });
  