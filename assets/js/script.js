var data = [];
$(document).ready(function () {
    var now = moment().format("dddd, MMMM Do");
    $("#currentDay").html(now);

    var currentHour = moment().hour() //0-23

    $("span.timeNumber").each(function () {

        var timeNumber = $(this).html().trim()
        //console.log(timeNumber);
        $(this).html(timeNumber);

        var blockHour = moment(timeNumber, "LT").hour()

        if (blockHour < currentHour) {
            $(this).parent().siblings(".col-6").addClass("past").removeClass("present future")

        } else if (blockHour === currentHour) {

            $(this).parent().siblings(".col-6").addClass("present").removeClass("past future")

        } else {
            $(this).parent().siblings(".col-6").addClass("future").removeClass("past present")
        };
    });
    Handlers();
});
const Handlers = () => {
    $(".open").click(function () {
        var p = $(this).children("p")
        var textarea = $("<textarea class=\"event\">")
        textarea.val(p.text())
        console.log(textarea.val())
        $(this).empty().append(textarea)
        textarea.trigger("focus")
        $(this).siblings(".saveBtn").find('.oi').removeClass('oi-lock-locked').addClass('oi-lock-unlocked');
    });

    $(document).on("blur", ".event", function (e) {
        var p = $("<p>")
        p.text($(this).val())
        $(this).parent().empty().append(p)
    });

    $(".event").on("keypress", function (e) {
        if (e.which == 13) {
            $(this).trigger("blur")
        }
    });

    $(".saveBtn").on("click", function (e) {

        $(this).find('.oi').removeClass("oi-lock-unlocked").addClass('oi-lock-locked')
        var p = $("<p>")
        var text = $(this).siblings().filter(".open").children()[0].textContent;
        var id = $(this).parent().attr("id");
        saveTasks(id, text)

    })
}

var loadTasks = function () {

    data = JSON.parse(localStorage.getItem("myTasks")) || [];

    data.forEach((element) => {
        var id = parseInt(element.id);
        //alert(row.task);
        $("#p" + (id - 8)).text(element.task);
    })
};

var saveTasks = function (id, task) {
    alert(id);
    data.push({ id: id, task: task });
    localStorage.setItem("myTasks", JSON.stringify(data));
};

//Load Tasks for the First Time
loadTasks();