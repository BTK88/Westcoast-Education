const convertFormDataToJson = (formData, isCourseForm = false) => {
  const data = Object.fromEntries(formData.entries());

  const numericFields = ['duration', 'price', 'popularity'];
  numericFields.forEach((field) => {
    if (field in data) {
      data[field] = parseFloat(data[field]);
    }
  });

  const checkboxFields = ['classroom', 'distance'];
  checkboxFields.forEach((field) => {
    if (isCourseForm || field in data) {
      data[field] = data[field] === 'on';
    } else {
      delete data[field];
    }
  });

  return data;
};

export { convertFormDataToJson };
