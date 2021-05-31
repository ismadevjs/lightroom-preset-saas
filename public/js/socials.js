let count = 0;
$("#social-media").on("click", function (e) {
  e.preventDefault;
  count += 1;
  $("#socials-add").append(`
    <div class="sign__group">
        <label class="sign__label" for="socials">Social Medias ${count}</label>
        <input id="socials" type="text" name="socials" class="sign__input" placeholder="facebook.com/agencedz">
    </div>
  `)
});
