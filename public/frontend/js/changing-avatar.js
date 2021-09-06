$('.svgImage').click(function() {
    $("#update-avatar").click()
})
$('#update-avatar').change(function() {
    $('#avatar-form').submit();
});