import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import img from '../assets/images/contact.jpg'

Contact.propTypes = {
    
};

function Contact(props) {
    return (
        <div>

        <section className="tf-page-title style-2">    
            <div className="tf-container">
                <div className="row">
                    <div className="col-md-12">

                        <ul className="breadcrumbs">
                            <li><Link to="/">Home</Link></li>
                            <li>Contact</li>
                        </ul>
                
                    </div>
                </div>
            </div>                    
        </section>
                
        <section className="tf-contact">
            <div className="tf-container">
                <div className="row ">
                    <div className="col-md-6">
                        <div className="image ani4">
                          <img src={img}></img>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="tf-heading style-3">
                            <h4 className="heading">Drop Up A Message</h4>
                            <p className="sub-heading">We're delighted to hear from you! Share your feedback, questions, or concerns, and we'll get back to you as soon as possible.</p>
                        </div>
                        <form action="contact/contact-process.php" method="post" id="commentform"  className="comment-form">
                            <fieldset className="name">
                                <input type="text" id="name" placeholder="Your Full Name" className="tb-my-input" name="name" tabIndex="2" aria-required="true" required="" />
                            </fieldset>    
                            <fieldset className="email">
                                <input type="email" id="email" placeholder="Your Email Address" className="tb-my-input" name="email" tabIndex="2" aria-required="true" required="" />
                            </fieldset>
                        
                            <fieldset className="message">
                                <textarea id="message" name="message" rows="4" placeholder="Message" tabIndex="4" aria-required="true" required="" />
                            </fieldset>
                            <div className="btn-submit"><button className="tf-button" type="submit">Send message</button></div>
                        </form>
                        

                    
                        
                    </div>
                </div>
            </div>
        </section>
            
        </div>
    );
}

export default Contact;