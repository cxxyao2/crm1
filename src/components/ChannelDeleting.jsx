formSchema
  .validate(this.createValidatedObj())
  .then(async () => {
    try {
      this.setState({ disabled: true }); // form lock
      switch (createOrUpdate) {
        case "create":
          const result = await this.handleSave(formData);
          if (result && result.data) {
            const newForm = { ...formData };
            newForm["_id"] = result.data._id;
            this.setState({ formData: newForm });
          }
          break;
        case "update":
          await updateChannel(formData);
          break;
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        result = { flag: false, message: err.response.data };
        this.setState({
          saveResult: result,
        });
      } else {
        result = { flag: false, message: JSON.stringify(err) };
        this.setState({
          saveResult: result,
        });
      }
      this.setState({ disabled: false }); // form 能修改
    }
  })
  .catch((errMsg) => {
    //  const transit = JSON.stringify(errMsg);
    const err = {
      name: undefined,
      address: undefined,
      contactPerson: undefined,
      phone: undefined,
      email: undefined,
      reasons: undefined,
    };
    // let index = transit.indexOf(" ");
    // err[transit.substr(1, index - 1)] = transit;
    console.log("errMsg is", errMsg);
    // this.setState({ err });
    // console.log("err is", err);
  });
