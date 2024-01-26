import axios from "axios";
import * as cheerio from "cheerio";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

/**
 * -1 is first page, 12 is second page, 24 is third page.
 * If neither of these values are specified no HTML will be returned
 *
 */
type Index = -1 | 12 | 24;

const pageNumber: Index = -1;

/**
 * If no index is specified, the will evalute to the endpoint for the first page
 */
const endpoint = `${process.env.EXPO_FOODBANK}${
  pageNumber > 0 ? "index/" + pageNumber * 12 : ""
}`;

axios
  .get(endpoint)
  .then((res) => {
    const $ = cheerio.load(res.data);
    // Find all elements with classname `title`
    const $title = $(".title");

    // For each element found, log the innerHTML
    $title.each((index, element) => {
      console.log($(element).html().trim());
    });

    return $title;
  })
  .catch((err) => {
    console.error(err);
  });

export const getFoodBankOppurtunities = async () => {
  return await axios
    .get(endpoint)
    .then((res) => {
      const $ = cheerio.load(res.data);
      // Find all elements with classname `title`
      const $title = $(".title");

      // For each element found, log the innerHTML
      $title.each((index, element) => {
        console.log($(element).html().trim());
      });

      return $title;
    })
    .catch((err) => {
      console.error(err);
    });
};
