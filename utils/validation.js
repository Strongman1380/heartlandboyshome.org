const { body, validationResult } = require('express-validator');

// Common validation rules
const commonValidations = {
  name: body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s\-'\.]+$/)
    .withMessage('Name can only contain letters, spaces, hyphens, apostrophes, and periods'),

  email: body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),

  phone: body('phone')
    .optional({ nullable: true, checkFalsy: true })
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),

  message: body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),

  organization: body('organization')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 200 })
    .withMessage('Organization name cannot exceed 200 characters'),

  title: body('title')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters')
};

// Contact form validation
const contactValidation = [
  commonValidations.name,
  commonValidations.email,
  commonValidations.phone,
  commonValidations.organization,
  commonValidations.title,
  commonValidations.message,
  
  body('inquiry-type')
    .isIn(['referral', 'information', 'partnership', 'employment', 'donation', 'other'])
    .withMessage('Please select a valid inquiry type'),

  body('urgency')
    .isIn(['routine', 'urgent'])
    .withMessage('Please select a valid urgency level'),

  body('preferred-contact')
    .isIn(['email', 'phone', 'either'])
    .withMessage('Please select a valid contact preference')
];

// Referral form validation
const referralValidation = [
  body('referrerName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Referrer name must be between 2 and 100 characters'),

  commonValidations.email,
  commonValidations.phone,
  commonValidations.organization,

  body('youthName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Youth name must be between 2 and 100 characters'),

  body('age')
    .isInt({ min: 12, max: 18 })
    .withMessage('Age must be between 12 and 18'),

  body('currentPlacement')
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('Current placement information is required'),

  body('urgency')
    .isIn(['immediate', 'within-week', 'within-month', 'planning'])
    .withMessage('Please select a valid urgency level'),

  body('background')
    .trim()
    .isLength({ min: 50, max: 3000 })
    .withMessage('Background information must be between 50 and 3000 characters')
];

// Volunteer form validation
const volunteerValidation = [
  commonValidations.name,
  commonValidations.email,
  commonValidations.phone,

  body('address')
    .trim()
    .isLength({ min: 10, max: 300 })
    .withMessage('Address must be between 10 and 300 characters'),

  body('volunteerType')
    .isIn(['mentoring', 'tutoring', 'recreation', 'life-skills', 'maintenance', 'events', 'other'])
    .withMessage('Please select a valid volunteer type'),

  body('availability')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Please provide your availability'),

  body('experience')
    .trim()
    .isLength({ min: 20, max: 1000 })
    .withMessage('Please provide information about your experience and motivation (20-1000 characters)')
];

// Newsletter validation
const newsletterValidation = [
  commonValidations.email,
  
  body('name')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage('Name cannot exceed 100 characters'),

  body('interests')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 200 })
    .withMessage('Interests cannot exceed 200 characters')
];

// Donation form validation
const donationValidation = [
  commonValidations.name,
  commonValidations.email,
  commonValidations.phone,
  commonValidations.message,

  body('donationType')
    .isIn(['monetary', 'goods', 'services', 'other'])
    .withMessage('Please select a valid donation type'),

  body('amount')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 50 })
    .withMessage('Amount/value description cannot exceed 50 characters')
];

// Validation result handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

module.exports = {
  contactValidation,
  referralValidation,
  volunteerValidation,
  newsletterValidation,
  donationValidation,
  handleValidationErrors
};