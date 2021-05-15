import moment from "moment";

export const isDate = (date) => {
  if (typeof date !== null && typeof date !== undefined) {
    const formattedDate = moment(date);
    return formattedDate.isValid();
  }
  return false;
};

export const formatDate = (date) => {
  if (isDate(date)) {
    return moment(date).format("YYYY-MM-DD");
  }
  return date;
};

export const formatTime = (date) => {
  if (isDate(date)) {
    return moment(date).format("HH:MM");
  }
  return date;
};

export const formatDateTime = (date) => {
  if (isDate(date)) {
    return `${formatDate(date)} at ${formatTime(date)}`;
  }
  return date;
};

export const getMillisecondsFromDate = (date) => {
  return Date.parse(date);
};

export const getHumanizedDate = (date, alwaysHumanize = true) => {
  if (isDate(date)) {
    const passedDateTime = getMillisecondsFromDate(moment(date).toDate());
    const currentDateTime = getMillisecondsFromDate(new Date());
    const timePassed = currentDateTime - passedDateTime;
    const daysPassed = moment.duration(-timePassed, "millisecond").asDays();

    if (!alwaysHumanize) {
      if (daysPassed < -31) {
        return formatDateTime(passedDateTime);
      }
    }

    return moment.duration(-timePassed, "millisecond").humanize(true);
  }
  return date;
};
