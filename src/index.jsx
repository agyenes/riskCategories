import ForgeUI, {
  CustomField,
  CustomFieldEdit,
  StatusLozenge,
  render,
  Text,
  useProductContext,
  Fragment,
  Select,
  Option,
} from "@forge/ui";

const View = () => {
  const getLozengeApperance = (priorityLevel) => {
    switch (priorityLevel) {
      case "low":
        return "success";
      case "medium":
        return "inprogress";
      case "high":
        return "removed";
      default:
        return "default";
    }
  };

  const {
    extensionContext: { fieldValue },
  } = useProductContext();

  return (
    <CustomField>
      <Text>
        <StatusLozenge
          text={fieldValue || "None"}
          appearance={getLozengeApperance(fieldValue)}
        />
      </Text>
    </CustomField>
  );
};

const Edit = () => {
  const onSubmit = (formValue) => {
    const probability = +formValue.probability;
    const impact = +formValue.impact;
    const score = probability * impact;

    if (score > 11) {
      return "high";
    } else if (score < 5) {
      return "low";
    } else {
      return "medium";
    }
  };

  return (
    <CustomFieldEdit
      onSubmit={onSubmit}
      header="Select risk attributes"
      width="medium"
    >
      <Fragment>
        <Select label="Probability" name="probability" isRequired>
          <Option label="1 - Low" value="1" />
          <Option label="3 - Medium" value="3" />
          <Option label="5 - High" value="5" />
        </Select>
        <Select label="Impact" name="impact" isRequired>
          <Option label="1 - Insignificant" value="1" />
          <Option label="2 - Slight" value="2" />
          <Option label="3 - Moderate" value="3" />
          <Option label="4 - Significant" value="4" />
          <Option label="5 - Disastrous" value="5" />
        </Select>
      </Fragment>
    </CustomFieldEdit>
  );
};

export const runView = render(<View />);
export const runEdit = render(<Edit />);
