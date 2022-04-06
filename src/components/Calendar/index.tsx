import { Scheduler, DayView } from "@progress/kendo-react-scheduler";
import { displayDate } from "./events-utc";
import moment from "moment";

import "./style.css";

export function Calendar({ listCalendar }: any) {
  // https://www.telerik.com/kendo-react-ui/components/scheduler/views/day/

  const currentYear = new Date().getFullYear();

  const parseAdjust = (eventDate: string) => {
    const date = new Date(eventDate);
    date.setFullYear(currentYear);
    return date;
  };

  const sapleCalendar =
    listCalendar &&
    listCalendar.map((dataItem: any) => ({
      id: dataItem.id,
      start: parseAdjust(moment(`${dataItem.data}`).format("YYYY-MM-DD h:mm")),
      end: parseAdjust(
        moment(`${dataItem.data}`).add(20, "minutes").format("YYYY-MM-DD h:mm")
      ),
      title: (
        <div className="content-med">
          <i className="fa fa-plus-square"></i>
          <span>
            {dataItem.patinet && dataItem.patinet.name} - {dataItem.name}
          </span>
        </div>
      ),
      description: dataItem.name,
    }));

  return (
    <div className="">
      <Scheduler data={sapleCalendar} defaultDate={displayDate}>
        <DayView
          title="Two-Day-View"
          numberOfDays={3}
          slotDuration={60}
          slotDivisions={2}
          // startTime={"07:00"}
          // endTime={"19:00"}
          workDayStart={"01:00"}
          workDayEnd={"23:00"}
          onDataAction={(e) => console.log(e)}
        />
      </Scheduler>
    </div>
  );
}
