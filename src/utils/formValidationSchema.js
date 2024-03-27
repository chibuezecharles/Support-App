import * as yup from "yup";

export const signInSchema = yup.object().shape({
  email: yup.string().email("Wrong email format").required("Email is required"),
  password: yup.string().required("You must enter password"),
});

export const addUserSchema = yup.object().shape({
  firstName: yup.string().required("Enter User First Name"),
  lastName: yup.string().required("Enter User Last Name"),
  email: yup.string().email("Wrong email format").required("Email is required"),
  role: yup
    .array()
    .min(1, "Please select at least one role")
    .required("At least 1 role is Required"),
});

export const createProjectFormSchema = yup.object().shape({
  NameofProject: yup.string().required("Enter Project Name"),
  LineofBusiness: yup.string().required("Enter Line of Business"),
  ClientName: yup.string().required("Select Client Name"),
  Description: yup.string().required("Enter Description"),
  BusinessManager: yup.string().required("Enter Business Manager"),
  ProductManager: yup.string().required("Enter Product Manager"),
  StartDate: yup.string().required("Enter Start Date"),
  EndDate: yup.string().required("Enter End Date"),
  AssignDevelopers: yup.array().min(1, "Please select at least one Developer"),
  ProjectTeamLead: yup.string().required("Enter Project Team Lead"),
  BRS: yup.string().required("Enter Share Point URl BRS"),
  SRS: yup.string().required("Enter Share Point SRS"),
});

export const changeProjectFormSchema = yup.object().shape({
  Project: yup.string().required("Enter Project Name"),
  RequestDetails: yup.string().required("Enter Request Details"),
  StartDate: yup.string().required("Enter Start Date"),
  EndDate: yup.string().required("Enter End Date"),
  RequestBy: yup.string().required("Enter Request By"),
  AssignDevelopers: yup.array().min(1, "Please select at least one Developer"),
  BRS: yup.string().required("Enter Share Point URl BRS"),
  SRS: yup.string().required("Enter Share Point SRS"),
});

export const SupportProjectFormSchema = yup.object().shape({
  ProjectName: yup.string().required("Enter Project Name"),
  IssueDescription: yup.string().required("Enter Issue Description"),
  DateReported: yup.string().required("Enter Date Reported"),
  StartDate: yup.string().required("Enter Start Date"),
  EndDate: yup.string().required("Enter End Date"),
  AssignDevelopers: yup.array().min(1, "Please select at least one Developer"),
});

export const projectCommentSchema = yup.object().shape({
  comment: yup.string().required("Enter The Comment"),
});

export const devProjectSOPSchema = yup.object().shape({
  title: yup.string().required("Enter The SOP Title"),
  steps: yup.string().required("Enter The SOP Steps"),
});

function atLeastOneField(fields) {
  return function (value) {
    const isValid = fields.some((field) => !!value[field]);
    if (isValid) return true;
    return this.createError({
      path: "fieldError",
      message: "One field must be set",
    });
  };
}

export const GenerateReportFormSchema = yup
  .object()
  .shape({
    projectName: yup.string(),
    startDate: yup.date(),
    endDate: yup.date(),
    developerName: yup.string(),
  })
  .test({
    name: "atLeastOneRequired",
    message: "You must fill at least one field",
    test: atLeastOneField([
      "projectName",
      "startDate",
      "endDate",
      "developerName",
      "test",
    ]),
  });
