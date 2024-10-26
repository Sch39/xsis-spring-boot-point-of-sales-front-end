$('.quantity button').on('click', function () {
  var button = $(this);
  var oldValue = button.parent().parent().find('input').val();
  if (button.hasClass('btn-plus')) {
      var newVal = parseFloat(oldValue) + 1;
  } else {
      if (oldValue > 0) {
          var newVal = parseFloat(oldValue) - 1;
      } else {
          newVal = 0;
      }
  }
  button.parent().parent().find('input').val(newVal);
});

function truncateDescription(description, limit = 10) {
  const words = description.split(" ");
  return words.length > limit ? words.slice(0, limit).join(" ") + "..." : description;
}

$('#addProduct').click(function (e) { 
  e.preventDefault();
  $('#modalTitleId').text('Tambah Produk');

  $('#modalBodyId').html(`
      <div class="row align-items-center justify-content-center py-3 px-xl-8">
        <div class="col-12 text-start">
          <form action="">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Search for products">
              <button class="btn btn-outline-primary ml-2" type="button">
                <i class="fa fa-search"></i>
              </button>
            </div>
            
            <div class="row align-items-center justify-content-start mt-3">
              <div class="col-auto">
                <label for="sortBy" class="mr-2">Sort By:</label>
                <select id="sortBy" class="form-select">
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                  <option value="date">Date Added</option>
                  <!-- Tambahkan opsi lain sesuai kebutuhan -->
                </select>
              </div>
              
              <div class="col-auto">
                <label for="sortDirection" class="mr-2">Direction:</label>
                <select id="sortDirection" class="form-select">
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div id='searchResult' class='row align-items-center justify-content-center py-3'>
      </div>
    `);

  $('#modalBodyId').append(`
     <div id='searchNav' class='row align-items-center justify-content-center mb-5'>
      <nav aria-label="" class='col-12'>
        <ul class="pagination justify-content-center">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item active" aria-current="page">
            <span class="page-link">2</span>
          </li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>

    `);
    

    var sampleData = [
      {
          "id": 35,
          "name": "Venusaur",
          "slug": "accusamus_dolor",
          "description": "Consequatur exercitationem veritatis vel. Exercitationem ab omnis inventore est. Esse aut facere quaerat delectus et. Mollitia possimus doloremque. Non rerum nihil rerum veniam quo accusamus. Voluptate ut soluta voluptate consequatur commodi rerum. Et asperiores eos recusandae voluptatem non inventore cum. Omnis omnis laborum aspernatur possimus et voluptate. Dolore et itaque amet voluptas nam aliquam. Est illo eos. Sunt nostrum velit magnam. Reprehenderit beatae tempora natus quos eaque aspernatur earum.",
          "price": 231962.84,
          "stock": 21.0,
          "product_id": 9,
          "product": {
              "id": 9,
              "name": "Ergonomic Granite Hat",
              "slug": "dolore_beatae",
              "category_id": 3
          },
          "category": {
              "id": 3,
              "name": "Beauty, Electronics & Movies",
              "slug": "quibusdam_error"
          }
      },
      {
          "id": 36,
          "name": "Venomoth",
          "slug": "dolores_vitae",
          "description": "Et ipsa placeat aut ipsa et quia. Repudiandae corrupti non quia. Suscipit et velit quisquam praesentium. Quia at similique deserunt nemo dolores. Quia repudiandae adipisci. Minus esse temporibus aliquid. Mollitia sunt rerum. Qui neque nobis est. Sed ut dignissimos ex laudantium ea illo quibusdam. Unde ut quidem aut eos porro ea a. Quas id eveniet vitae.",
          "price": 295550.26,
          "stock": 6.0,
          "product_id": 9,
          "product": {
              "id": 9,
              "name": "Ergonomic Granite Hat",
              "slug": "dolore_beatae",
              "category_id": 3
          },
          "category": {
              "id": 3,
              "name": "Beauty, Electronics & Movies",
              "slug": "quibusdam_error"
          }
      },
      {
          "id": 26,
          "name": "Vaporeon",
          "slug": "velit_vitae",
          "description": "Tempore qui expedita. Dolorem omnis soluta facere. Eveniet consequuntur facere. Sit adipisci sit. Animi sequi officiis eius animi aliquam laborum accusantium. Accusantium eum eius. Ut culpa hic et veritatis. Aliquid dignissimos voluptate omnis. Doloribus minus pariatur asperiores. Fugit sunt quidem explicabo exercitationem. Voluptatem qui mollitia vel dolores et quae. Est quam porro aperiam autem provident.",
          "price": 259275.09,
          "stock": 3.0,
          "product_id": 7,
          "product": {
              "id": 7,
              "name": "Incredible Concrete Coat",
              "slug": "aut_ab",
              "category_id": 3
          },
          "category": {
              "id": 3,
              "name": "Beauty, Electronics & Movies",
              "slug": "quibusdam_error"
          }
      },
      {
          "id": 30,
          "name": "Rhyhorn",
          "slug": "deserunt_similique",
          "description": "Asperiores aspernatur voluptas omnis sit. Quas dolor rerum sint alias porro et quis. Est laborum voluptates eveniet aperiam totam. Ea dolores non rem rerum voluptas. Enim facere odio. In assumenda et. Vitae corporis voluptatum facilis ducimus sit quam architecto. Voluptatem dolorem voluptatem reprehenderit impedit et et. Natus commodi et est at dicta. Sunt nam et rerum asperiores ducimus. Sequi debitis veritatis quia incidunt provident. Dolorem inventore velit in est voluptatem.",
          "price": 236158.76,
          "stock": 20.0,
          "product_id": 8,
          "product": {
              "id": 8,
              "name": "Synergistic Linen Pants",
              "slug": "voluptatum_consequuntur",
              "category_id": 3
          },
          "category": {
              "id": 3,
              "name": "Beauty, Electronics & Movies",
              "slug": "quibusdam_error"
          }
      },
      {
          "id": 28,
          "name": "Rhydon",
          "slug": "occaecati_dolores",
          "description": "Aperiam neque voluptas ad ipsum similique. Et voluptates perferendis ut perferendis non libero. Nisi magnam harum similique eius. Ipsam fugiat corporis. Sit vero at non assumenda ut similique dolores. Tempora earum voluptas cumque. Earum suscipit beatae officiis perferendis facere. Laboriosam autem eos error quisquam laboriosam porro. Minima fugit sed reiciendis ipsum. Aut pariatur maiores eos explicabo expedita pariatur blanditiis. Iusto sed quo nihil. Fuga ut fuga et facilis minus ut.",
          "price": 146375.57,
          "stock": 10.0,
          "product_id": 7,
          "product": {
              "id": 7,
              "name": "Incredible Concrete Coat",
              "slug": "aut_ab",
              "category_id": 3
          },
          "category": {
              "id": 3,
              "name": "Beauty, Electronics & Movies",
              "slug": "quibusdam_error"
          }
      }
  ];
    // Clear previous results
    $('#searchResult').html(`
      <div class="table-responsive">
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Pilih</th>
              <th>Slug</th>
              <th>Nama/Deskripsi</th>
              <th>Harga</th>
              <th>Stok</th>
            </tr>
          </thead>
          <tbody id="productTableBody">
          </tbody>
        </table>
      </div>
      `);
    
    // Display each search result item
    sampleData.forEach(item => {
      $('#productTableBody').append(`
      <tr>
        <td>
          <button class="btn btn-sm text-dark p-2 btn-outline-dark" data-id="${item.id}">
          <i class="fas fa-cart-plus text-primary mr-1"></i></button>
        </td>
        <td>
          <a href="/products/${item.slug}/detail" target="_blank" class="text-decoration-none">
            ${item.slug} 
            <i class="fas fa-external-link-alt ml-1" title="Open in new tab"></i>
          </a>
        </td>
        <td>${item.name}/
        <br>
        ${truncateDescription(item.description, 5)}
        </td>
        <td>${item.price}</td>
        <td>${item.stock}</td>
      </tr>
      `);
    });

  $('#modalId').modal('show');
});