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

// https://arxiv.org/abs/2001.01818
// "After collecting all the papers, we then came up with initial sets of 20 keywords or phrases for each of the eight following domains: agriculture, education, environmental sustainability, healthcare, combating information manipulation, social care and urban planning, public safety, and transportation"

// https://doi.org/10.1016/j.techsoc.2026.103331
// they reviwed 170 papers and checked if a predefined benefit was present
// "AI benefits (RQ3) were coded as present if the study discussed concrete advantages of GAI. These included efficacy improvements (e.g., enhanced task performance or accuracy), decision-making support (e.g., data-informed insights), automation (e.g., AI replacing manual tasks), personalization (e.g., tailoring services to user needs), or other innovative outcomes (e.g., collaborative improvements or environmental contributions).'"

// https://doi.org/10.1016/j.procs.2026.03.172
// "Table 1 summarises the main benefits of integrating AI in PM, highlighting the supporting literature."

// https://doi.org/10.24251/HICSS.2022.723
// "Hence, when identifying the potential benefit(s), it is important to examine only the direct and not the indirect benefit(s), as otherwise the quality of this dimension is diluted. The dimension’s characteristics are thus the following: “Cost Performance”, “Quality Performance”, “Revenue Performance”, and “Risk and Compliance Performance”."

// TODO
const aiBenefitsTaxonomy = [""];

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
          name: "question1",
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
          name: "question2",
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
          name: "question3",
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
          name: "question4",
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
          name: "question5",
          title:
            "Identify your current use-cases of AI and list the ways you use AI tools.",
          description:
            'Add one use case per entry. Use the "Add another use case" button below.',
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
          name: "question6",
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
          name: "question7",
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
          name: "question8",
          visibleIf: "{question7} = 'Item 1'",
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
          name: "question9",
          visibleIf: "{question7} = 'Item 1'",
          title:
            "Do you have any other AI-use rules that are not tied to a specific use case?",
        },
      ],
    },
    {
      name: "page5",
      title: "Benefits and Harms",
      elements: [
        {
          type: "matrixdynamic",
          name: "question10",
          title: "For each use case, identify any benefits or harms you see.",
          description:
            "Use commas to list multiple benefits or harms per use case.",
          isRequired: true,
          columns: [
            {
              name: "Use case",
              title: "Use case",
              cellType: "text",
              readOnly: true,
            },
            {
              name: "Benefits",
              title: "Benefits",
              cellType: "comment",
              isRequired: true,
            },
            {
              name: "Harms",
              title: "Harms",
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
      name: "page6",
      title: "Categorize Benefits and Harms ",
      elements: [
        {
          type: "matrixdynamic",
          name: "question11",
          title:
            "For each benefit and harm identified, select all of the categories that best describe the perceived or potential benefit and harm.",
          isRequired: true,
          columns: [
            {
              name: "Use case",
              cellType: "text",
              readOnly: true,
            },
            {
              name: "Benefits",
              title: "Benefits",
              cellType: "text",
              readOnly: true,
            },
            {
              name: "Benefit category",
              title: "Benefit category",
              choices: [1, 2, 3, 4, 5],
              isRequired: true,
            },
            {
              name: "Harms",
              title: "Harms",
              cellType: "text",
              readOnly: true,
            },
            {
              name: "Harm category",
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
          name: "question12",
          title:
            "Use the benefits and harms you identified to help create a rule for each use case and explain your reason.",
          isRequired: true,
          columns: [
            {
              name: "Use case",
              cellType: "text",
              readOnly: true,
            },
            {
              name: "Benefits",
              title: "Benefits",
              cellType: "text",
              readOnly: true,
            },
            {
              name: "Harms",
              title: "Harms",
              cellType: "text",
              readOnly: true,
            },
            {
              name: "Rule",
              title: "Rule",
              cellType: "comment",
              isRequired: true,
            },
            {
              name: "Rule reason",
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
          name: "question13",
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
              name: "Benefits",
              title: "Benefits",
              cellType: "text",
              readOnly: true,
            },
            {
              name: "Harms",
              title: "Harms",
              cellType: "text",
              readOnly: true,
            },
            {
              name: "Rule",
              title: "Rule",
              cellType: "comment",
              readOnly: true,
            },
            {
              name: "Follow difficulty",
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
              name: "Follow strategy",
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
          name: "question14",
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
              text: "Identifying benefits of your AI use cases",
            },
            {
              value: "Item 4",
              text: "Identifying harms of your AI use cases",
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
          name: "question15",
          title:
            "How difficult was it to create personal rules for each of your AI use cases?",
          isRequired: true,
          minRateDescription: "very easy",
          maxRateDescription: "very difficult",
        },
        {
          type: "rating",
          name: "question16",
          title:
            "How difficult was it to identify benefits and harms of your AI use cases?",
          isRequired: true,
          minRateDescription: "very easy",
          maxRateDescription: "very difficult",
        },
        {
          type: "rating",
          name: "question17",
          title:
            "How useful was this process for thinking about your own AI use?",
          isRequired: true,
          minRateDescription: "not at all useful",
          maxRateDescription: "very useful",
        },
        {
          type: "comment",
          name: "question18",
          title:
            "What, if anything, did this process make you think about differently?",
          isRequired: true,
          autoGrow: false,
          allowResize: false,
        },
        {
          type: "comment",
          name: "question19",
          title:
            "Briefly explain what made the hardest part of this process the most difficult.",
          isRequired: true,
          autoGrow: false,
          allowResize: false,
        },
        {
          type: "radiogroup",
          name: "question20",
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
  showTimerPanel: "none",
  headerView: "advanced",
};

const survey = new Survey.Model(surveyJson);

survey.applyTheme(SurveyTheme.LayeredLightPanelless);

survey.setValue("PROLIFIC_PID", PROLIFIC_PID);
survey.setValue("STUDY_ID", STUDY_ID);
survey.setValue("SESSION_ID", SESSION_ID);

survey.onValueChanged.add((survey, { name, question, value }) => {
  // Copy use cases to future questions
  if (name == "question5") {
    const userUseCases = [];

    if (value) {
      value.forEach((entry) => {
        const useCase = entry["Use case"];

        if (useCase && useCase.trim() !== "") {
          userUseCases.push({
            "Use case": useCase,
          });
        }
      });
    }

    survey.setValue("question6", userUseCases);
    survey.setValue("question8", userUseCases);
    survey.setValue("question10", userUseCases);
    survey.setValue("question11", userUseCases);
    survey.setValue("question12", userUseCases);
    survey.setValue("question13", userUseCases);
  }

  // Copy benefits and harms to future questions
  if (name == "question10") {
    const userBenefitsAndHarms = [];

    if (value) {
      value.forEach((entry) => {
        const benefit = entry["Benefits"];
        const harm = entry["Harms"];

        if (benefit || harm) {
          let rule = "";
          const question8Data = survey.getValue("question8");

          if (question8Data) {
            question8Data.forEach((existingRule) => {
              if (existingRule["Use case"] == entry["Use case"]) {
                rule = existingRule["Existing rule"];
              }
            });
          }

          userBenefitsAndHarms.push({
            "Use case": entry["Use case"],
            Benefits: benefit,
            Harms: harm,
            Rule: rule,
          });
        }
      });
    }

    survey.setValue("question11", userBenefitsAndHarms);
    survey.setValue("question12", userBenefitsAndHarms);
    survey.setValue("question13", userBenefitsAndHarms);
  }

  // Copy existing rules to future questions
  if (name == "question8") {
    const question12Data = survey.getValue("question12");
    const existingRules = [];

    if (question12Data) {
      question12Data.forEach((entry) => {
        const useCase = entry["Use case"];
        let rule = "";

        if (value) {
          value.forEach((ruleEntry) => {
            if (ruleEntry["Use case"] == useCase) {
              rule = ruleEntry["Existing rule"];
            }
          });
        }

        existingRules.push({
          "Use case": useCase,
          Benefits: entry["Benefits"],
          Harms: entry["Harms"],
          Rule: rule,
          "Rule reason": entry["Rule reason"],
        });
      });
    }

    survey.setValue("question12", existingRules);
  }

  // Copy final rules to future questions
  if (name == "question12") {
    const finalRules = [];

    if (value) {
      value.forEach((entry) => {
        finalRules.push({
          "Use case": entry["Use case"],
          Benefits: entry["Benefits"],
          Harms: entry["Harms"],
          Rule: entry["Rule"],
        });
      });
    }

    survey.setValue("question13", finalRules);
  }
});

function alertResults(sender) {
  sender.setValue("totalTimeSpent", sender.timeSpent);

  sender.pages.forEach((page) => {
    sender.setValue(page.name + "_timeSpent", page.timeSpent);
  });

  const results = JSON.stringify(sender.data);
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
