import MessageModal from './MessageModal.js';
export default class Buttons {
  constructor(recipients, fund, call, goBack) {
    this.el = document.createElement('div');
    this.getLocation = this.getLocation;
    this.call = call;
    this.handleCall = this.handleCall.bind(this);
    this.handleDM = this.handleDM.bind(this);
    this.goBack = goBack;
    this.recipients = recipients;
    this.fund = fund;
  }

  async handleDM() {
    const payload = {
      recipients: this.recipients,
      fund: this.fund
    }

    const resp = await fetch('https://www.shitgoingdown.com/api/message', {method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json'}, credentials: 'include'});
    if (resp.ok) {
      const data = resp.json();
    }
  }

  handleBack() {
    console.log('go back');
    this.goBack();
  }

  openModal(e) {
    e.preventDefault();
    const modal = new MessageModal(this.recipients, this.handleDM.bind(this));
    this.el.append(modal.render());
    console.log('MSG DM');
  }

  handleCall(e) {
    e.preventDefault();
    console.log('Calling bail');
  }

  getContactList() {
    return this.recipients.map(contact => {
      return `
      <div class="contact-reminder">
        ${contact.name} -- ${contact.screen_name}
      </div>
      `;
    }).join('');
  }

  render() {
    this.el.innerHTML = `
    <div class="generalpage">

    <div class="nav">
    <div class="upButtons">
      <a class="goBackEnd" href="#">« back</a>
        <a class="logo" href="https://www.shitgoingdown.com">www.shitgoingdown.com</a>
      </div>
     </div>
      <div class='finalPage'>
      <h1 class="safe">stay safe</h1>
       <div class='buttons'>
        <div class='bailDiv'>
        <div class='smsDiv BAIL'>
          <a class="telBail" href="tel:+1${this.fund.number}">
          <button class="SMS callBail">Call</br> Bail</br> Fund</button>
          </a>
          </div>
          <p class='loginInstructionTwo btn'>The bail fund info:
          Name: ${this.fund.name}, </br>
           Tel: <a class="loginInstructionTwo btn" href="tel:+1${this.fund.number}">+1${this.fund.number}</a></br>
           ${this.fund.city}, ${this.fund.state}</p>
         </div>
         <div class='smsDiv'>
         <div class='smsDiv DM'>
          <button class="SMS">DM trusted friends</button>
          </div>
          <p class="loginInstructionTwo btn"> your contacts info:</br>
           ${this.getContactList()}
          </p>
         </div>
        </div>
       </div>
     
    `;
    this.el.querySelector('.goBackEnd').addEventListener('click', this.goBack)
    //this.el.querySelector('.callBail').addEventListener('click', this.handleCall);
    this.el.querySelector('.SMS').addEventListener('click', e => {
      this.openModal(e);
    });

    return this.el;
  }


  unmount() {
    this.el.querySelector('.callBail').removeEventListener('click', this.handleCall);
    this.el.querySelector('.SMS').removeEventListener('click', this.openModal);
    this.el.querySelector('.goBackEnd').removeEventListener('click', this.goBack);

  }
}
