class HelpService {
  index() {
    return {
      message: "Test service",
    };
  }
}

const helpService = new HelpService();

export { helpService };
