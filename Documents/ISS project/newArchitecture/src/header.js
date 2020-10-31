function dynamicdropdown(listindex) {

    document.getElementById("subcategory").length = 0;
    switch (listindex) {
        case "sdg1":

            document.getElementById("subcategory").options[0] = new Option("med_hhd_inc_wk_tot", "med_hhd_inc_wk_tot");
            document.getElementById('sdgbc').innerHTML = 'sdg1/';
            document.getElementById('ibc').innerHTML = 'med_hhd_inc_wk_tot/';
            document.getElementById("subcategory2").options[0] = new Option("2016", "2016");


            break;

        case "sdg2":
            document.getElementById("subcategory").options[0] = new Option("perc_population_food_insecurity", "perc_population_food_insecurity");
            document.getElementById('sdgbc').innerHTML = 'sdg2/';
            document.getElementById('ibc').innerHTML = 'perc_population_food_insecurity/';
            document.getElementById("subcategory2").options[0] = new Option("2019", "2019");
            break;
        case "sdg3":
            document.getElementById("subcategory").options[0] = new Option("Indicator 3.4.1", "Indicator 3.4.1");
            document.getElementById('sdgbc').innerHTML = 'sdg3/';
            document.getElementById('ibc').innerHTML = ''

            break;
        case "sdg4":
            document.getElementById("subcategory").options[0] = new Option("chld_enrld_prescl_prog_5_yr_olds_enrld_prescl_prescl_prog_num", "chld_enrld_prescl_prog_5_yr_olds_enrld_prescl_prescl_prog_num");
            document.getElementById('sdgbc').innerHTML = 'sdg4/';
            document.getElementById('ibc').innerHTML = 'chld_enrld_prescl_prog_5_yr_olds_enrld_prescl_prescl_prog_num/';
            document.getElementById("subcategory2").options[0] = new Option("2018", "sdg4");
            document.getElementById("subcategory2").options[1] = new Option("2013", "sdg4-13");
            document.getElementById("subcategory2").options[2] = new Option("2015", "sdg4-15");
            
            break;
        case "sdg5":
            document.getElementById("subcategory").options[0] = new Option("%_of_women_councillors_in_local_parliament", "%_of_women_councillors_in_local_parliament");
            document.getElementById('sdgbc').innerHTML = 'sdg5/';
            document.getElementById('ibc').innerHTML = '%_of_women_councillors_in_local_parliament/';
            document.getElementById("subcategory2").options[0] = new Option("2017", "2017");
            break;
        case "sdg16":
            document.getElementById("subcategory").options[0] = new Option("a10_homicide_and_related_offences", "a10_homicide_and_related_offences");
            document.getElementById('sdgbc').innerHTML = 'sdg16/';
            document.getElementById('ibc').innerHTML = 'a10_homicide_and_related_offences/';
            document.getElementById("subcategory2").options[0] = new Option("2019", "sdg16");
            document.getElementById("subcategory2").options[1] = new Option("2013", "sdg16-13");
            document.getElementById("subcategory2").options[2] = new Option("2015", "sdg16-15");
            
            break;
    }
    return true;
}

function dropdown(index) {

    switch (index) {
        case '2018': document.getElementById('ybc').innerHTML = '2018'; break;
        case '2019': document.getElementById('ybc').innerHTML = '2019'; break;
        case '2020': document.getElementById('ybc').innerHTML = '2020'; break;
    }

}

var quotes = [
    'The greatest threat to our planet is the belief that someone else will save it. – Robert Swan, Author',
    'Often when you think you’re at the end of something, you’re at the beginning of something else. – Fred Rogers, Television Personality',
    'There is no such thing as ‘away’. When we throw anything away it must go somewhere. -Annie Leonard, Proponent of Sustainability',
    'When you put the whole picture together, recycling is the right thing to do. -Pam Shoemaker, Author',
    'We cannot solve our problems with the same thinking we used when we created them. -Albert Einstein, Physicist',
    'We do not inherit the Earth from our ancestors; we borrow it from our children. -Native American Proverb',
    'We never know the worth of water till the well is dry. -Thomas Fuller, Historian',
    'Recycling, packaging, businesses are changing all of those things because that’s what consumers want. -Jerry Greenfield, Co-founder of Ben & Jerry’s Ice Cream',
    'If it can’t be reduced, reused, repaired, rebuilt, refurbished, refinished, resold, recycled, or composted, then it should be restricted, designed or removed from production. -Pete Seeger, Folk Singer & Social Activist',
    'We are living on this planet as if we had another one to go to. -Terry Swearingen, Nurse & Winner of Goldman Environmental Prize in 1997',
    'Buy less, choose well. - Vivienne Westwood, Fashion Designer',
    'At its core, the issue of a clean environment is a matter of public health. -Gina McCarthy, Administrator for the U.S. Environmental Protection Agency',
]


function newQuote() {
    var randomNumber = Math.floor(Math.random() * quotes.length);
    document.getElementById('quoteDisplay').innerHTML = quotes[randomNumber];
}