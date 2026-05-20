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
const aiHarmsTaxonomy = [
  "Autonomy/agency loss",
  "Addiction",
  "Alienation/isolation",
  "Anxiety/depression",
  "Coercion/manipulation",
  "Over-reliance",
  "Loss of confidence/trust",
  "Confidentiality loss",
  "Radicalisation",
  "Privacy loss",
  "Breach of ethics/values/norms",
  "Cheating/plagiarism",
  "Loss of creativity/critical thinking",
  "Environmental",
  "IP/copyright loss",
  "Stereotyping/discrimination",
  "Information degradation/hallucinations",
  "Opportunity loss",
  "Bodily Injury/loss of life",
  "Cultural dispossession",
  "Dehumanisation/objectification",
  "Harassment/abuse/intimidation/trauma",
];

const nistAIUseTaxonomyTooltips = {
  "Content creation":
    "The AI system assists by generating new artifacts such as video, narrative, software code, synthetic data.",
  "Content synthesis":
    "The AI system assists by combining and/or summarizing parts, elements, or concepts into a coherent whole.",
  "Decision making":
    "The AI system assists by selecting a course of action from among possible alternatives in order to arrive at a solution.",
  Detection:
    "The AI system assists by identifying, by careful search, examination, or probing, the existence or presence of [something].",
  "Digital assistance":
    "The AI system assists by acting as a personal agent for understanding and responding to commands and questions, and carrying out requested tasks in a conversational manner.",
  Discovery:
    "The AI system assists by finding, recognizing, or unearthing something for the first time.",
  "Image analysis":
    "The AI system assists by recognizing attributes within digital images to extract meaningful information.",
  "Information retrieval/search":
    "The AI system assists by finding information about specific topics of interest.",
  Monitoring:
    "The AI system assists by observing, checking, and watching over the process, quality, or state of [something] over time to gain insights into how [something] is behaving or performing.",
  "Performance improvement":
    "The AI system assists by improving quality and efficiency of the intended outcomes.",
  Personalization:
    "The AI system assists by designing and tailoring [something] to meet an individual's characteristics, preferences, or behaviors.",
  Prediction:
    "The AI system assists by forecasting the likelihood of a future outcome.",
  "Process automation":
    "The AI system assists by performing repetitive tasks, removing bottlenecks, reducing errors and loss of data, and increasing efficiency of a process.",
  Recommendation:
    "The AI system assists by suggesting or proposing a manageable set of viable options to aid decision-making.",
  "Robotic automation":
    "The AI system assists by using physical machines to automate, improve, and/or optimize a variety of tasks.",
  "Vehicular automation":
    "The AI system assists by automating physical transportation of goods, instrumentation and/or people.",
};

const aiHarmsTaxonomyTooltips = {
  "Autonomy/agency loss":
    "Loss of an individual, group or organisation’s ability to make informed decisions or pursue goals.",
  Addiction:
    "Emotional or material dependence on technology or a technology system.",
  "Alienation/isolation":
    "An individual’s or group’s feeling of lack of connection with those around as a result of technology use or misuse.",
  "Anxiety/depression":
    "Mental health decline due to addiction, negative social interactions such as humiliation and shaming and traumatic distressing events such as online violence or rape.",
  "Coercion/manipulation":
    "Use of a technology system to covertly alter user beliefs and behaviour using nudging, dark patterns and/or other opaque techniques, resulting in potential erosion of privacy, addiction, anxiety/distress, etc.",
  "Over-reliance":
    "Unfettered and/or obsessive belief in the accuracy or other quality of a technology system, resulting in addiction, anxiety, introversion, sentience, complacency, lack of critical thinking and other actual or potential negative impacts.",
  "Loss of confidence/trust":
    "Misleading or unfair change(s) in how an individual, group, or organisation is viewed, leading to loss of ability to conduct relationships, raise capital, recruit people, etc.",
  "Confidentiality loss":
    "Unauthorised sharing of sensitive, confidential information and documents such as corporate strategy and financial plans with third-parties.",
  Radicalisation:
    "Adoption of extreme political, social, or religious ideals and aspirations due to the nature or misuse of an algorithmic system, potentially resulting in abuse, violence, or terrorism.",
  "Privacy loss":
    "Unwarranted exposure of an individual’s private life or personal data through cyberattacks, doxxing, etc.",
  "Breach of ethics/values/norms":
    "An actual or perceived violation or deviation from the established societal values, norms or ethical standards or principles.",
  "Cheating/plagiarism":
    "Use of another person’s or group’s words or ideas without consent and/or acknowledgement.",
  "Loss of creativity/critical thinking":
    "Devaluation and/or deterioration of human creativity, artistic expression, imagination, critical thinking or problem-solving skills.",
  Environmental:
    "Negative environmental impacts of a technology system, including effects on climate, ecosystems, and natural resources such as carbon emissions, energy and water consumption, pollution, waste, and biodiversity loss.",
  "IP/copyright loss":
    "Misuse or abuse of an individual or organisation’s intellectual property, including copyright, trademarks, and patents.",
  "Stereotyping/discrimination":
    "Derogatory or otherwise harmful stereotyping or homogenisation of individuals, groups, societies or cultures due to the mis-representation, over-representation, under-representation, or non-representation of specific identities, groups, or perspectives or the unfair or inadequate treatment or the arbitrary distinction based on a person’s race, ethnicity, age, gender, sexual preference, religion, national origin, marital status, disability, language, or other protected groups.",
  "Information degradation/hallucinations":
    "Creation or spread of false, hallucinatory, low-quality, misleading, or inaccurate information that degrades the information ecosystem and causes people to develop false or inaccurate perceptions, decisions and beliefs; or to lose trust in accurate information.",
  "Opportunity loss":
    "Loss of opportunities for an individual to benefit from financial or other opportunity, such as education, employability/securing a job",
  "Bodily Injury/loss of life":
    "Physical pain, injury, illness, or disease suffered by an individual or group due to the malfunction, use or misuse of a technology system or the accidental or deliberate loss of life, including suicide, extinction or cessation, due to the use or misuse of a technology system.",
  "Cultural dispossession":
    "Intentional and/or unintentional erasure of cultural goods and values, such as ways of speaking, expressing humour, or sounds and voices that contribute to a cultural identity, or their inappropriate re-use in other cultures.",
  "Dehumanisation/objectification":
    "Use or misuse of a technology system to depict and/or treat people as not human, less than human, or as objects, or reinforce similar behaviors through interaction with the system",
  "Harassment/abuse/intimidation/trauma":
    "Online behaviour, including sexual harassment, that makes an individual or group feel alarmed or threatened or a severe and lasting emotional shock and pain caused by an extremely upsetting experience by the system.",
};

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
            'A "use case" is a specific task or activity you use AI for. It is more specific. For example, instead of listing "school," you would described the specific task, such as "Help with math homework." Add one use case at a time using the "Add another use case" button.',
          isRequired: true,
          columns: [
            {
              name: "Use case",
              cellType: "text",
              isRequired: true,
            },
          ],
          minRowCount: 2,
          maxRowCount: 8,
          rowCount: 2,
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
          description:
            "To see definitions of categories, hover over the category for about half a second.",
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
            "For each use case, describe any rule, guidline, or policy you already follow when using AI.",
          description:
            "An existing rule could be habit or reminder you have in place for yourself when using AI. It could be things you avoid doing or things you check before relying on AI. Blank responses for use cases you don't have a rule for are okay.",
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
          title: "For each use case, identify possible harms you see.",
          description:
            'A harm could be a possible risk or negative consequence related to that use of AI. For example, for "Help with math homework" a possible harm could be "Reducing critical thinking." Add one harm at a time using the "Add harm" button. To see definitions of categories, hover over the category for about half a second.',
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
                {
                  name: "harmCategories",
                  title: "Harm category",
                  cellType: "tagbox",
                  choices: aiHarmsTaxonomy,
                  isRequired: true,
                },
              ],
              isRequired: true,
              minRowCount: 1,
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
      title: "Create Your Personal AI Use Policy",
      elements: [
        {
          type: "matrixdynamic",
          name: "personalPolicyRulesQuestion",
          title:
            "Based on the harms you identified, create a rule for each use case and explain your reason.",
          description:
            'A rule could be a habit, limit, reminder, something you check, avoid, etc., you follow when or before using AI for a specific use case. For example, for "Help with math homework," a rule could be "I will try problems by myself first and ask my professor before using AI." For the reason, please explain why you chose the rule and how you might see it address the harms you previously identified.',
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
              cellType: "comment",
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
      name: "page7",
      title: "Following Your Rules",
      elements: [
        {
          type: "matrixdynamic",
          name: "ruleFollowStrategiesQuestion",
          title:
            "For each rule identified, determine how easy it will be to follow and any strategies you will use to follow the rule.",
          description:
            "For strategy, describe what you might do to manage, remember, or enforce the rule.",
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
              cellType: "comment",
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
      name: "page8",
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
          description:
            "You can use this space to describe any uncertainty, confusion, difficulty thinking of examples, categorizing, or anything else during this survey.",
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
  navigateToUrl: "https://google.com",
  showPageNumbers: true,
  showProgressBar: true,
  progressBarLocation: "aboveheader",
  allowResizeComment: false,
  showTimer: true,
  timerLocation: "bottom",
  headerView: "advanced",
};

const survey = new Survey.Model(surveyJson);

// https://surveyjs.io/form-library/examples/change-survey-html-with-javascript/reactjs#content-code
// changed to make work with dynamic content like dropdown
// https://surveyjs.io/form-library/documentation/api-reference/survey-data-model#onPopupVisibleChanged
function addTooltipToDropdownMenuItems(_, options) {
  // do nothing if it is not open
  if (!options.visible) {
    return;
  }

  // options.htmlElement threw an error so switched to whole document and it worked
  // added sv-popup cause it is in the html for the dropdown inspected
  // also found sv-list__item-body which also has a title attribute
  // consistently adds the tooltip when sv-list__item-body is targeted instead of only sv-string-viewer
  // only add to sv-list__item-body elemets that containt a sv-string-viewer
  // since it seems like sv-list__item-body appears elsewhere outside of dropdown elements
  setTimeout(() => {
    document.querySelectorAll(".sv-popup .sv-list__item-body").forEach((el) => {
      if (!el.querySelector(".sv-string-viewer")) {
        return;
      }

      const tooltip =
        nistAIUseTaxonomyTooltips[el.innerText.trim()] ||
        aiHarmsTaxonomyTooltips[el.innerText.trim()];
      if (tooltip) {
        el.title = tooltip;
      }
    });
  }, 50);
}

// changed from onAfterRenderQuestion to onPopupVisibleChanged
// made sense for this use case based on the documentation linked above
survey.onPopupVisibleChanged.add(addTooltipToDropdownMenuItems);

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
    survey.setValue("personalPolicyRulesQuestion", userUseCasesIdentified);
    survey.setValue("ruleFollowStrategiesQuestion", userUseCasesIdentified);
  }

  // Copy harms to future questions
  if (name == "useCaseHarmsQuestion") {
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
            }
          });
        }

        const allHarmsAsCsv = harms.join(", ");

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

  // const prolificRedirectUrl =
  //   "https://google.com";
  // window.location.href = prolificRedirectUrl;
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