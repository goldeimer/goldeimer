<?php


/// --------------------------------- P-Bank ----------------------------------
/// TODO(Johannes):
/// Document the "P-Bank"


const P_BANK_PAGE_ID = 13893;


function isPBankPage()
{
    return is_page(P_BANK_PAGE_ID);
}


/// @brief Displays a non-default logo image on selected page(s).
function avChangeLogoOnPBankPage($logoImagePath)
{
    if (isPBankPage())
    {
        return "http://www.goldeimer.de/wp-content/uploads/2019/06/" .
               "P-Bank_Logo-y.png";
    }

    return $logoImagePath;
}

add_filter(
    'avf_logo',
    'avChangeLogoOnPBankPage'
);


/// @brief Uses a non-default `href` attribute value for the logo link on
/// selected page(s).
function avChangeLogoLinkOnPBankPage($link)
{
    if (isPBankPage())
    {
        return "#welcome";
    }

    return $link;
}

add_filter(
    'avf_logo_link',
    'avChangeLogoLinkOnPBankPage'
);


?>
