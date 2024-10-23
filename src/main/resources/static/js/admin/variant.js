$('#createProduct').click((e)=>{
  clearForm();

  $('#modalTitle').text('Tambah variant');
  $('#modalDesc').text('Silahkan berikan detail varian');
  $('#saveForm').attr('action', '/admin/product-management/variant/save');
  $('#modalForm').modal('show');
});

function editForm(el) {
  clearForm();
  
  let id = $(el).data('id'),
  name = $(el).data('name'),
  description =$(el).data('description'),
  price = $(el).data('price'),
  stock = $(el).data('stock'),
  productId = $(el).data('product-id'),
  categoryId = $(el).data('category-id'),
  slug = $(el).data('slug'),
  deleted = $(el).data('deleted');

  let productListItems = document.querySelectorAll('.product-list-item');

  productListItems.forEach((el)=>{
      if ($(el).data('category-id') == categoryId) {
        el.classList.remove('d-none');
      }
  });

  $('#modalTitle').text('Edit Produk '+ name);
  $('#modalDesc').text('Silahkan berikan detail produk');
  $('#saveForm').attr('action', '/admin/product-management/variant/save');
  $('#modalFieldId').val(id);
  $('#modalFieldName').val(name);
  $('#modalFieldDescription').val(description);
  $('#modalFieldPrice').val(price);
  $('#modalFieldStock').val(stock);
  $('#modalFieldProductId').val(productId);
  $('#modalFieldCategoryId').val(categoryId);
  $('#modalFieldSlug').val(slug);
  $('#modalFieldDeleted').prop('checked', deleted);
  
  $('#modalForm').modal('show');
}

function clearForm () { 
  $('#modalFieldId').val(null);
  $('#modalFieldCategoryId').val(null);
  $('#modalFieldProductId').val(null);
  $('#modalFieldSlug').val(null);
  $('#modalFieldName').val(null);
  $('#modalFieldDescription').val(null);
  $('#modalFieldPrice').val(null);
  $('#modalFieldStock').val(null);
  $('#modalFieldDeleted').prop('checked', false);
  hideAllProductItem();
 }

function deleteData(el){
  $('#deleteModalButton').attr('data-id', $(el).data('id'));
  $('#deleteName').text($(el).data('name'));
  $('#deleteSlug').text($(el).data('slug'));
  $('#deleteActive').prop('checked', $(el).data('deleted'));
  $('#deleteModal').modal('show');
 }

 document.getElementById('deleteModalButton')?.addEventListener('click', (e)=>{
  let id = $('#deleteModalButton').data('id');
  
  $.ajax({
    type: "get",
    url: `/admin/product-management/variant/delete/${id}`,
    dataType: "html",
    success: function (response) {
      location.reload();
    }
  });
});

document.getElementById("modalFieldCategoryId")
?.addEventListener("change", (e)=>{
  $('#modalFieldProductId').val(null);
  
let productListItems = document.querySelectorAll('.product-list-item');
let currentCategoryId = $('#modalFieldCategoryId').val();

productListItems.forEach((el)=>{
  if ($(el).data('category-id') == currentCategoryId) {
    el.classList.remove('d-none');
  }else{
    el.classList.add('d-none');
  }
});

});

function hideAllProductItem() {
  let productListItems = document.querySelectorAll('.product-list-item');

  productListItems.forEach((el)=>{
      el.classList.add('d-none');
  });
}