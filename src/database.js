import PouchDB from "pouchdb";

class Database {
  constructor() {
    this.db = new PouchDB("logAccessleUser");
  }

  storeInFile(what, callback) {
    console.log(what);
    this.db
      .post({
        hash: what.hash,
        where: what.where,
        when: what.when,
        value: what.value,
        what: what.what
      })
      .then(response => {
        callback(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  async getLogging() {
    let result = await this.db.allDocs({
      include_docs: true,
      attachments: true
    });
    var rows = [];

    if (result.total_rows > 0) {
      result.rows.forEach(element => {
        rows.push(element.doc);
      });
    }
    let createCsvStringifier = require("csv-writer").createObjectCsvStringifier;
    let csvStringifier = createCsvStringifier({
      header: [
        { id: "where", title: "WHERE" },
        { id: "what", title: "WHAT" },
        { id: "when", title: "WHEN" },
        { id: "value", title: "VALUE" },
        { id: "hash", title: "HASH" }
      ]
    });
    console.log(csvStringifier.stringifyRecords(rows));
    result =
      csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(rows);

    return result;
  }
}

export default Database;
