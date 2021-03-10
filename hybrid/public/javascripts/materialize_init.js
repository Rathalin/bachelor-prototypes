document.addEventListener("DOMContentLoaded", () => {
    M.AutoInit();

    M.Datepicker.init(document.querySelectorAll('.datepicker'), {
        autoClose: false,
        format: 'dd. mmm yyyy',
        defaultDate: new Date(2000, 1, 1),
        minDate: new Date(1900, 1, 1),
        maxDate: new Date(),
    });
});