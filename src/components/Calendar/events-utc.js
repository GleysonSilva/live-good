const baseData = [
  {
    Title: "Bowling TESTE",
    Description: "TESTE",
    Start: "2022-03-30T11:00:00.000Z",
    End: "2022-03-30T13:00:00.000Z",
  },
  {
    Title: "Bowling TESTE",
    Description: "TESTE",
    Start: "2022-03-30T13:00:00.000Z",
    End: "2022-03-30T14:00:00.000Z",
  },
];

const currentYear = new Date().getFullYear();

const parseAdjust = (eventDate) => {
  const date = new Date(eventDate);
  date.setFullYear(currentYear);
  return date;
};

export const displayDate = new Date(Date.UTC(currentYear, 5, 24));
export const sampleData = baseData.map((dataItem) => ({
  id: dataItem.TaskID,
  start: parseAdjust(dataItem.Start),
  end: parseAdjust(dataItem.End),
  title: dataItem.Title,
  description: dataItem.Description,
}));

export const sampleDataWithResources = baseData.map((dataItem) => ({
  id: dataItem.TaskID,
  start: parseAdjust(dataItem.Start),
  end: parseAdjust(dataItem.End),
  title: dataItem.Title,
  description: dataItem.Description,
}));

export const sampleDataWithCustomSchema = baseData.map((dataItem) => ({
  ...dataItem,
  Start: parseAdjust(dataItem.Start),
  End: parseAdjust(dataItem.End),
}));
