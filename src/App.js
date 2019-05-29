// Copyright 2019, J. Donald Tillman
// All rights reserved.
//
// Lincoln programming task.

import React, { Component } from 'react';
import './App.css';

// return the total value of these donations as a number
function donationsValue(donations) {
    return donations.reduce((a, d) => a + Number.parseFloat(d.donation_amount),
                            0);
}

// simple CSV parser
// returns a pair: the keys (in order) and the objects
function csvToObjs(str) {
    // lines, trim off white space, eliminate blank lines
    const lines = str.split('\n').map(l => l.trim()).filter(a => a);
    const keys = lines.shift().split(',');
    const objs = lines.map(l => {
        var obj = {};
        l.split(',').map((v, i) => obj[keys[i]] = v.trim());
        return obj;
    });
    return [keys, objs];
}

// boolean if the string is a valid list of email addresses.
function legalEmails(str) {
    const maximum = 3;
    var addresses = str.trim().split(',').map(s => s.trim());
    if ((0 == addresses.length) || (maximum < addresses.length)) {
	return false;
    }
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return addresses.every(s => re.test(s));
}

// Donation Table widget
//
// props
//   keys: a list of keys for the headings
//   donations: a list of objects
//   anon: true to filter out anonymous donors
class DonationTable extends Component {

    // make a CSV key presentable for a column heading
    prettyKey = key => {
        const right = key.split('_')[1];
        if (2 < right.length) {
            // JavaScript lacks capitalization
            return right.charAt(0).toUpperCase() + right.slice(1);
        } else {
            return right.toUpperCase();
        }            
    }        

    render() {
        const keys = this.props.keys;
        // (don't get confused: two different uses of "key" here: )
        const headings = keys.map((k, i) =>
                                  <th {...{ key: i}}>
                                    { this.prettyKey(k) }
                                  </th>);
        // the table body 
        const body = this.props.donations
              .filter(d => !this.props.anon || d.donor_name)
              .map((d, i) => (
                  <tr {...{key: i}} >
                    { keys.map((k, i) => <td {...{ key: i }} >
                                           { d[k] }
                                         </td>) }
                  </tr>
              ));
        return (
            <div {...{className: 'donationTable'}} >
              {
                  (this.props.donations.length) ? (
                      <table>
                        <thead><tr>{ headings }</tr></thead>
                        <tbody>{ body }</tbody>
                      </table>
                  ) : (
                      <p {...{className: 'none'}}>
                        No donations loaded.
                        <br />
                        Drag a CSV file here to add in donation data.
                      </p>
                  )
              }
            </div>
        );
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { donationKeys: [],
                       donations: [],
                       anon: false,
                       addCount: 0,
                       addresses: ''};
    }

    // Add CSV file
    addFile(file) {
        const reader = new FileReader();
        reader.onload = ev => {
	    const text = ev.target.result;
	    const [keys, donations] = csvToObjs(text);
            const state = this.state;

            // FUTURE: If you wanted to process the donation objects
            // this would be the place to do it.

            this.setState({ donationKeys: state.donationKeys && keys,
                            donations: state.donations.concat(donations),
                            addCount: state.addCount + 1 });
            this.noteNewDonations(donations);
        };
        reader.readAsText(file);
    }

    // Update the "notes" section and send out email notices.
    noteNewDonations(donations) {
        const anonDonations = donations.filter(d => !d.donor_name);
        const value = donationsValue(donations);
        const anonPercent = Math.round(100 * anonDonations.length / donations.length);
        const anonPercentVal = Math.round(100 * donationsValue(anonDonations) / value);
        const text = 'Add #' + this.state.addCount + ': ' +
              donations.length + ' donations added: ' +
              'value $ ' + value.toFixed(2) + ', ' +
              anonPercent + '% are anonymous, ' +
              anonPercentVal + '% anonymous by value.';
        this.setState({note: text});

        // send out email if we can
        if (legalEmails(this.state.addresses) && this.state.userid.trim()) {
            window.emailjs.init(this.state.userid.trim());
            window.emailjs.send('default_service',
                                'default',
                                {subject: 'Lincoln Donation Tool Alert',
                                 content: text,
                                 to_addresses: this.state.addresses.trim() });
        }
    }
                       
    // User has just dropped a file, or multiple files.
    dropHandler = ev => {
        ev.preventDefault();

        // support both interfaces
        if (ev.dataTransfer.items) {
	    // interface: DataTransferItemList 
	    const items = ev.dataTransfer.items;
	    for (let i = 0; i < items.length; i++) {
	        const item = items[i];
	        if ('file' === item.kind) {
		    this.addFile(item.getAsFile());
	        }
	    }
        } else {
	    // interface: DataTransfer
	    ev.dataTransfer.file.forEach(this.addFile);
        }
    }

    render() {
        return (
            <div {...{ className: 'App',
                       onDragOver: ev => ev.preventDefault() }} >
              <p>
                A donation table tool.
              </p>
              <p>
                Dragging and dropping a donation CSV file will add
                those donations to the table.  Any number of files can
                be added.  You can add a file multiple times and we're
                not going to check.  Any number of files can be dropped
                at once.
              </p>
              <p>
                The total donations are summed below.
              </p>
              <p>
                For each set of donations added, we include some data
                about that set.
              </p>
              <p>
                You can have a small email message sent out for each
                set of donations added. For this you need to supply a
                list of email addresses and a super secret user ID you
                can get from Don.  The email address field automatically
                validates.  There are a maximum of 3 email addresses
                for now.
              </p>
              <div {... { onDrop: this.dropHandler } } >
                <DonationTable {...{ keys: this.state.donationKeys,
                                     donations: this.state.donations,
                                     anon: this.state.anon }} />
                <p>
                  Total donation amount:
                  ${ donationsValue(this.state.donations).toFixed(2) }
                </p>
                <p>
                  <button {...{ onClick: ev => this.setState({anon: !this.state.anon}),
                                className: (this.state.anon) ? 'on' : ''}} >
                    Filter
                  </button> out anonymouse donations.
                </p>
                <p>
                  { this.state.note }
                </p>
                <p>
                  Email addresses for alerts (comma separated):
                  <input {...{ className: legalEmails(this.state.addresses) ? 'emails' : 'emailsBad',
			       value: this.state.addresses,
			       onChange: ev => this.setState({addresses: ev.target.value }) }} />
                </p>
		<p>
	          User ID for mail service:
	          <input {...{ className: 'userid',
                               value: this.state.userid,
                               onChange: ev => this.setState({userid: ev.target.value}) }} />
                </p>
              </div >
            </div>
        );
    }
}
export default App;
