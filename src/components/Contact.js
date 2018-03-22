import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import ContactCreate from './ContactCreate';
import update from 'react-addons-update';

class Contact extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedKey: -1,
      keyword: '',
      contactData : [
        {
          name: 'Albert',
          phone: '010-1234-5678'
        },
        {
          name: 'Kevin',
          phone: '010-2233-9080'
        },
        {
          name: 'Mike',
          phone: '010-0000-0001'
        },
        {
          name: 'Robert',
          phone: '010-1222-3333'
        },
        {
          name: 'Ace',
          phone: '000-1111-2222'
        }
      ]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

    componentWillMount() {
        const contactData = localStorage.contactData;
        if(contactData) {
            this.setState({
                contactData: JSON.parse(contactData)
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(JSON.stringify(prevState.contactData) != JSON.stringify(this.state.contactData)) {
            localStorage.contactData = JSON.stringify(this.state.contactData);
        }
    }


  handleCreate(contact) {
    this.setState({
      contactData: update( this.state.contactData, { $push : [contact]} )
    });
  }

  handleRemove() {
      if(this.state.selectedKey < 0) {
          return;
      }
    this.setState({
      contactData: update( this.state.contactData, {$splice: [[this.state.selectedKey, 1]]} ),
      selectedKey: -1
    });
  }

  handleEdit(name, phone) {
    this.setState({
      contactData: update(this.state.contactData,
        {
          [this.state.selectedKey]: {
            name: {$set: name},
            phone: {$set: phone}
          }
        }
      )
    });
  }

  handleChange(e) {
    this.setState ({
      keyword: e.target.value
    });
  }

  handleClick(key) {
    this.setState({
      selectedKey: key
    });

    console.log(key + "is selected");
  }

  render() {
    const mapToComponent = (data) => {
      data.sort();
      data = data.filter((contact)=> {
        return contact.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1
      })

      return (
        data.map((contact,i)=>{
          return(
            <ContactInfo
              contact={contact}
              key={i}
              onClick={()=>this.handleClick(i)}
           />
          );
        })
      );
    }

    return(
      <div>
        <h1>Contact</h1>
        <input
          name="keyword"
          placeholder="Search"
          value={this.state.keyword}
          onChange={this.handleChange}
        />
        <div>{mapToComponent(this.state.contactData)}</div>
        <ContactDetails
          isSelected={this.state.selectedKey != -1}
          contact={this.state.contactData[this.state.selectedKey]}
          onRemove={this.handleRemove}
          onEdit={this.handleEdit}
        />
        <ContactCreate
            onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default Contact
