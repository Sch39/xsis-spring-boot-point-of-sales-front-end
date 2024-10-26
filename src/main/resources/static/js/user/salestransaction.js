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

function renderSearchResult(containerId, dataObj){
  $('#'+containerId).html('');

  dataObj.forEach(item => {
    $('#'+containerId).append(`
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
}

$(document).on('submit', '#searchForm', function (e) { 
  e.preventDefault();
  
});

$('#addProductModalButton').click(function (e) { 
  e.preventDefault();
  $('#modalTitleId').text('Tambah Produk');

  $('#modalBodyId').html(`
      <div class="row align-items-center justify-content-center py-3 px-xl-8">
        <div class="col-12 text-start">
          <form id="searchForm">
            <div class="input-group">
              <input id="searchInput" type="text" class="form-control" placeholder="Search by variant/product/category">
              <button id="searchButton" class="btn btn-outline-primary ml-2" type="submit">
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

      $.ajax({
        url: 'http://localhost:9001/api/variants/search',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
          console.log('reponse');
          
            // Pastikan permintaan sukses
            if (response.success) {
                const products = response.data.content;
                
                renderSearchResult('productTableBody', products);
            } else {
                alert("Gagal mengambil data: " + response.message);
            }
        },
        error: function(error) {
            console.error("Error:", error);
        }
    });

  $('#modalId').modal('show');
});