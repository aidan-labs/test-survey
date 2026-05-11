const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const PROLIFIC_PID = urlParams.get("PROLIFIC_PID");
const STUDY_ID = urlParams.get("STUDY_ID");
const SESSION_ID = urlParams.get("SESSION_ID");

// const SURVEY_ID = 1;

// https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=956852
// "a human-AI task can be considered as a combination of one or more activities"
const nistAIUseTaxonomy = [
  "Content creation",
  "Content synthesis",
  "Decision making",
  "Detection",
  "Digital assistance",
  "Discovery",
  "Image analysis",
  "Information retrieval/search",
  "Monitoring",
  "Performance improvement",
  "Personalization",
  "Prediction",
  "Process automation",
  "Recommendation",
  "Robotic automation",
  "Vehicular automation",
];

// https://arxiv.org/pdf/2407.01294
// "Flexible and extensible, to be easily updated to account for technological developments, adoption, and the emergence of new use cases"

// TODO
const aiHarmsTaxonomy = [
  "Autonomy",
  "Physical",
  "Psychological",
  "Reputational",
  "Financial and Business",
  "Human Rights and Civil Liberties",
  "Societal and Cultural",
  "Political and Economic",
  "Environmental",
];

// trust and distrust methods (sort of)
// https://arxiv.org/pdf/2403.00582
// used prolific
// "a self-reported data quality item" becasue https://psycnet.apa.org/doi/10.1037/a0028085
// "seven-point Likert-type response scale ranging from 1 ("not at all") to 7 ("extremely")"

// for usage
// https://doi.org/10.1016/j.chbah.2025.100221
/**
 * Each item assessed how frequently participants engaged in specific generative AI behaviours
 * over the past month, using a 7-point scale from “Never” to “Always.” Sample items
 * include: “How frequently did you use generative AI to get personalized suggestions for
 * books, movies, or travel ideas in the last month?” (self- interest oriented)
 * and “How often did you use generative AI to help you make decisions at work or in your studies?”
 *
 * All corrected item-to-total correlations exceeded .40. Response distribution analysis revealed
 * sparse usage (<10 %) in extreme categories, prompting a recode to a 5-point scale: 1 =Never;
 * 2 =Rarely (~2 times/month); 3 =Occasionally (~1 time/ week); 4 =Frequently (several times/week);
 * and 5 =Very Frequently (nearly daily). This improved category stability while preserving conceptual range.
 *
 * A one-month recall window was chosen to balance the need for capturing stable behavioral routines
 * with concerns about memory decay and participant burden. This aligns with survey methodology
 * recommending 30-day periods for habitual behavior (Clarke et al., 2008) and is supported by digital
 * media research showing that one-month self-reports are predictive of logged usage
 * (Parry et al., 2021; Verbeij et al., 2022).
 */

// for familiarity
// https://doi.org/10.1016/j.respol.2025.105381
/**
 *  ‘‘How familiar are you with AI tools’’ with a six-point scale: (1) ‘‘Do not know’’,
 * (2) ‘‘I do not know any AI tools’’, (3) ‘‘I never used AI tools but heard of them’’,
 * (4) ‘‘I used AI tools a few times’’, (5) ‘‘Rather familiar’’, (6) ‘‘Very familiar’’.
 */

const surveyJson = {
  title: "Personal AI Use Policy",
  pages: [
    {
      name: "page1",
      title: "Background",
      elements: [
        {
          type: "radiogroup",
          name: "aiFamiliarityQuestion",
          title:
            "How familiar are you with AI tools such as ChatGPT, Claude, Gemini, Copilot, or similar tools?",
          isRequired: true,
          choices: [
            {
              value: "Item 1",
              text: "Do not know",
            },
            {
              value: "Item 2",
              text: "I do not know any AI tools",
            },
            {
              value: "Item 3",
              text: "I never used AI tools but heard of them",
            },
            {
              value: "Item 4",
              text: "I used AI tools a few times",
            },
            {
              value: "Item 5",
              text: "Rather familiar",
            },
            {
              value: "Item 6",
              text: "Very familiar",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "aiUsageFrequencyQuestion",
          title:
            "In the last month, how often have you used AI tools such as ChatGPT, Claude, Gemini, Copilot, or similar tools for personal use?",
          isRequired: true,
          choices: [
            {
              value: "Item 1",
              text: "Never",
            },
            {
              value: "Item 2",
              text: "Rarely (~2 times/month)",
            },
            {
              value: "Item 3",
              text: "Occasionally (~1 time/week)",
            },
            {
              value: "Item 4",
              text: "Frequently (several times/week)",
            },
            {
              value: "Item 5",
              text: "Very Frequently (nearly daily)",
            },
          ],
        },
        {
          type: "rating",
          name: "aiTrustQuestion",
          title:
            "How much do you trust AI tools such as ChatGPT, Claude, Gemini, Copilot, or similar tools?",
          isRequired: true,
          rateCount: 7,
          rateMax: 7,
          minRateDescription: "not at all",
          maxRateDescription: "extremely",
        },
        {
          type: "rating",
          name: "aiDistrustQuestion",
          title:
            "How much do you distrust AI tools such as ChatGPT, Claude, Gemini, Copilot, or similar tools?",
          isRequired: true,
          rateCount: 7,
          rateMax: 7,
          minRateDescription: "not at all",
          maxRateDescription: "extremely",
        },
      ],
    },
    {
      name: "page2",
      title: "AI Use Cases",
      elements: [
        {
          type: "matrixdynamic",
          name: "listUseCasesQuestion",
          title:
            "Identify your current use-cases of AI and list the ways you use AI tools.",
          description:
            'Add one use case at a time using the "Add another use case" button.',
          isRequired: true,
          columns: [
            {
              name: "Use case",
              cellType: "text",
              isRequired: true,
            },
          ],
          rowCount: 1,
          addRowText: "Add another use case",
        },
      ],
    },
    {
      name: "page3",
      title: "Categorize Your Use Cases",
      elements: [
        {
          type: "matrixdynamic",
          name: "useCaseCategoriesQuestion",
          title:
            "For each use case identified, select all of the categories that best describe it.",
          isRequired: true,
          columns: [
            {
              name: "Use case",
              cellType: "text",
              readOnly: true,
            },
            {
              name: "Category",
              cellType: "tagbox",
              choices: nistAIUseTaxonomy,
              isRequired: true,
            },
          ],
          allowAddRows: false,
          allowRemoveRows: false,
        },
      ],
    },
    {
      name: "page4",
      title: "Rules You Already Follow",
      elements: [
        {
          type: "radiogroup",
          name: "existingRulesQuestion",
          title:
            "Do you currently follow any personal rules when using AI tools?",
          isRequired: true,
          choices: [
            {
              value: "Item 1",
              text: "Yes",
            },
            {
              value: "Item 2",
              text: "No",
            },
            {
              value: "Item 3",
              text: "Not sure",
            },
          ],
        },
        {
          type: "matrixdynamic",
          name: "existingRulesForUseCaseQuestion",
          visibleIf: "{existingRulesQuestion} = 'Item 1'",
          title:
            "For each use case, write any rule or policy you already follow.",
          description:
            "Blank responses for use cases you don't have a rule for are okay.",
          isRequired: true,
          columns: [
            {
              name: "Use case",
              cellType: "text",
              readOnly: true,
            },
            {
              name: "Existing rule",
              cellType: "comment",
            },
          ],
          allowAddRows: false,
          allowRemoveRows: false,
        },
        {
          type: "comment",
          name: "otherExistingRulesQuestion",
          visibleIf: "{existingRulesQuestion} = 'Item 1'",
          title:
            "Do you have any other AI-use rules that are not tied to a specific use case?",
        },
      ],
    },
    {
      name: "page5",
      title: "Identify Perceived Harms",
      elements: [
        {
          type: "paneldynamic",
          name: "useCaseHarmsQuestion",
          title: "For each use case, identify any harms you see.",
          description: 'Add one harm at a time using the "Add harm" button.',
          templateElements: [
            {
              type: "text",
              name: "Use case",
              title: "Use Case",
              readOnly: true,
            },
            {
              type: "matrixdynamic",
              name: "allHarmsIdentified",
              title: "Harms",
              columns: [
                {
                  name: "harm",
                  title: "Harm",
                  cellType: "text",
                  isRequired: true,
                },
              ],
              isRequired: true,
              rowCount: 1,
              addRowText: "Add another harm",
            },
          ],
          panelCount: 1,
          allowAddPanel: false,
          allowRemovePanel: false,
        },
      ],
    },
    {
      name: "page6",
      title: "Categorize Perceived Harms ",
      elements: [
        {
          type: "matrixdynamic",
          name: "harmCategoriesQuestion",
          title:
            "For each harm identified, select all categories that best describe the perceived or potential harm.",
          isRequired: true,
          columns: [
            {
              name: "Use case",
              cellType: "text",
              readOnly: true,
            },
            {
              name: "harm",
              title: "Harm",
              cellType: "text",
              readOnly: true,
            },
            {
              name: "harmCategories",
              title: "Harm category",
              cellType: "tagbox",
              choices: aiHarmsTaxonomy,
              isRequired: true,
            },
          ],
          allowAddRows: false,
          allowRemoveRows: false,
        },
      ],
    },
    {
      name: "page7",
      title: "Create Your Personal AI Use Policy",
      elements: [
        {
          type: "matrixdynamic",
          name: "personalPolicyRulesQuestion",
          title:
            "Based on the harms you identified, create a rule for each use case and explain your reason.",
          isRequired: true,
          columns: [
            {
              name: "Use case",
              cellType: "text",
              readOnly: true,
            },
            {
              name: "allHarmsAsCsv",
              title: "Harms",
              cellType: "text",
              readOnly: true,
            },
            {
              name: "rule",
              title: "Rule",
              cellType: "comment",
              isRequired: true,
            },
            {
              name: "ruleReason",
              title: "Reason",
              cellType: "comment",
              isRequired: true,
            },
          ],
          allowAddRows: false,
          allowRemoveRows: false,
        },
      ],
    },
    {
      name: "page8",
      title: "Following Your Rules",
      elements: [
        {
          type: "matrixdynamic",
          name: "ruleFollowStrategiesQuestion",
          title:
            "For each rule identified, determine how easy it will be to follow and any strategies you will use to follow the rule.",
          isRequired: true,
          columns: [
            {
              name: "Use case",
              cellType: "text",
              readOnly: true,
            },
            {
              name: "allHarmsAsCsv",
              title: "Harms",
              cellType: "text",
              readOnly: true,
            },
            {
              name: "rule",
              title: "Rule",
              cellType: "comment",
              readOnly: true,
            },
            {
              name: "ruleFollowDifficulty",
              title: "How easy will the rule be to follow?",
              cellType: "dropdown",
              isRequired: true,
              choices: [
                {
                  value: 1,
                  text: "Easy",
                },
                {
                  value: 2,
                  text: "Medium",
                },
                {
                  value: 3,
                  text: "Hard",
                },
              ],
              storeOthersAsComment: true,
            },
            {
              name: "ruleFollowStrategy",
              title: "Strategy to follow the rule",
              cellType: "comment",
              isRequired: true,
            },
          ],
          allowAddRows: false,
          allowRemoveRows: false,
        },
      ],
    },
    {
      name: "page9",
      title: "Process Reflection",
      elements: [
        {
          type: "ranking",
          name: "hardestPartsOfSurveyRankingQuestion",
          title: "What was the hardest part of this survey?",
          description:
            "Drag and drop to rank from hardest (top) to easiest (bottom).",
          isRequired: true,
          choices: [
            {
              value: "Item 1",
              text: "Identifying your AI use cases",
            },
            {
              value: "Item 2",
              text: "Categorizing your AI use cases",
            },
            {
              value: "Item 3",
              text: "Identifying harms of your AI use cases",
            },
            {
              value: "Item 4",
              text: "Categorizing the perceived harms of your AI use cases",
            },
            {
              value: "Item 5",
              text: "Creating personal rules for your AI use cases",
            },
            {
              value: "Item 6",
              text: "Explaining why you chose each rule",
            },
            {
              value: "Item 7",
              text: "Thinking of strategies to follow the rules",
            },
          ],
          choicesOrder: "random",
        },
        {
          type: "rating",
          name: "ruleCreationDifficultyQuestion",
          title:
            "How difficult was it to create personal rules for each of your AI use cases?",
          isRequired: true,
          minRateDescription: "very easy",
          maxRateDescription: "very difficult",
        },
        {
          type: "rating",
          name: "harmIdentificationDifficultyQuestion",
          title: "How difficult was it to identify harms of your AI use cases?",
          isRequired: true,
          minRateDescription: "very easy",
          maxRateDescription: "very difficult",
        },
        {
          type: "rating",
          name: "processUsefulnessQuestion",
          title:
            "How useful was this process for thinking about your own AI use?",
          isRequired: true,
          minRateDescription: "not at all useful",
          maxRateDescription: "very useful",
        },
        {
          type: "comment",
          name: "processOverallReflectionQuestion",
          title:
            "What, if anything, did this process make you think about differently?",
          isRequired: true,
          autoGrow: false,
          allowResize: false,
        },
        {
          type: "comment",
          name: "hardestPartOfSurveyExplanationQuestion",
          title:
            "Briefly explain what made the hardest part of this process the most difficult.",
          isRequired: true,
          autoGrow: false,
          allowResize: false,
        },
        {
          type: "radiogroup",
          name: "surveyResponseQualityQuestion",
          title: "Should we use your responses in our analysis?",
          isRequired: true,
          choices: [
            {
              value: "Item 1",
              text: "Yes, I answered truthfully and carefully",
            },
            {
              value: "Item 2",
              text: "No, I did not answer truthfully and carefully",
            },
            {
              value: "Item 3",
              text: "Not sure",
            },
          ],
        },
      ],
    },
  ],
  showPageNumbers: true,
  showProgressBar: true,
  progressBarLocation: "aboveheader",
  allowResizeComment: false,
  showTimer: true,
  timerLocation: "bottom",
  headerView: "advanced",
};

const survey = new Survey.Model(surveyJson);

survey.applyTheme(SurveyTheme.LayeredLightPanelless);

survey.setValue("PROLIFIC_PID", PROLIFIC_PID);
survey.setValue("STUDY_ID", STUDY_ID);
survey.setValue("SESSION_ID", SESSION_ID);

survey.onValueChanged.add((survey, { name, question, value }) => {
  // Copy use cases to future questions
  if (name == "listUseCasesQuestion") {
    const userUseCasesIdentified = [];

    if (value) {
      value.forEach((entry) => {
        const useCase = entry["Use case"];

        if (useCase) {
          userUseCasesIdentified.push({
            "Use case": useCase,
          });
        }
      });
    }

    survey.setValue("useCaseCategoriesQuestion", userUseCasesIdentified);
    survey.setValue("existingRulesForUseCaseQuestion", userUseCasesIdentified);
    survey.setValue("useCaseHarmsQuestion", userUseCasesIdentified);
    survey.setValue("harmCategoriesQuestion", userUseCasesIdentified);
    survey.setValue("personalPolicyRulesQuestion", userUseCasesIdentified);
    survey.setValue("ruleFollowStrategiesQuestion", userUseCasesIdentified);
  }

  // Copy harms to future questions
  if (name == "useCaseHarmsQuestion") {
    const harmCategoryRows = [];

    const useCaseData = [];

    if (value) {
      value.forEach((entry) => {
        const useCase = entry["Use case"];

        const harms = [];

        if (entry.allHarmsIdentified) {
          entry.allHarmsIdentified.forEach((harmEntry) => {
            const harm = harmEntry.harm;

            if (harm) {
              harms.push(harm);

              harmCategoryRows.push({
                "Use case": useCase,
                harm: harm,
              });
            }
          });
        }

        allHarmsAsCsv = harms.join(", ");

        let existingRule = "";

        const existingRulesData = survey.getValue(
          "existingRulesForUseCaseQuestion",
        );

        if (existingRulesData) {
          existingRulesData.forEach((ruleEntry) => {
            if (ruleEntry["Use case"] == useCase) {
              existingRule = ruleEntry["Existing rule"];
            }
          });
        }

        useCaseData.push({
          "Use case": useCase,
          allHarmsAsCsv: allHarmsAsCsv,
          rule: existingRule,
        });
      });
    }

    survey.setValue("harmCategoriesQuestion", harmCategoryRows);
    survey.setValue("personalPolicyRulesQuestion", useCaseData);
    survey.setValue("ruleFollowStrategiesQuestion", useCaseData);
  }

  // Copy existing rules to future questions
  if (name == "existingRulesForUseCaseQuestion") {
    const personalPolicyRulesData = survey.getValue(
      "personalPolicyRulesQuestion",
    );

    const updatedRules = [];

    if (personalPolicyRulesData) {
      personalPolicyRulesData.forEach((entry) => {
        const useCase = entry["Use case"];

        let existingRule = "";

        if (value) {
          value.forEach((ruleEntry) => {
            if (ruleEntry["Use case"] == useCase) {
              existingRule = ruleEntry["Existing rule"];
            }
          });
        }

        updatedRules.push({
          "Use case": useCase,
          allHarmsAsCsv: entry.allHarmsAsCsv,
          rule: existingRule,
          ruleReason: entry.ruleReason,
        });
      });
    }

    survey.setValue("personalPolicyRulesQuestion", updatedRules);
  }

  // Copy final rules to future questions
  if (name == "personalPolicyRulesQuestion") {
    const finalRules = [];

    if (value) {
      value.forEach((entry) => {
        finalRules.push({
          "Use case": entry["Use case"],
          allHarmsAsCsv: entry.allHarmsAsCsv,
          rule: entry.rule,
        });
      });
    }

    survey.setValue("ruleFollowStrategiesQuestion", finalRules);
  }
});

function alertResults(sender) {
  sender.setValue("totalTimeSpent", sender.timeSpent);

  sender.pages.forEach((page) => {
    sender.setValue(page.name + "_timeSpent", page.timeSpent);
  });

  const results = JSON.stringify(sender.data);
  console.log(results);
  alert(results);
  // saveSurveyResults(
  //     "https://your-web-service.com/" + SURVEY_ID,
  //     sender.data
  // )
}

survey.onComplete.add(alertResults);

document.addEventListener("DOMContentLoaded", function () {
  survey.render(document.getElementById("surveyContainer"));
});

// function saveSurveyResults(url, json) {
//     fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json;charset=UTF-8'
//         },
//         body: JSON.stringify(json)
//     })
//     .then(response => {
//         if (response.ok) {
//             // Handle success
//         } else {
//             // Handle error
//         }
//     })
//     .catch(error => {
//         // Handle error
//     });
// }
