import { db } from '../config/db.js';

export async function getAllApplications(req, res) {
  try {
    const { status, search, sortBy, sortOrder } = req.query;
    const applications = db.getApplications(req.user.id, {
      status,
      search,
      sortBy,
      sortOrder
    });

    return res.json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (err) {
    console.error('Get applications error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve applications.'
    });
  }
}

export async function getApplicationById(req, res) {
  try {
    const { id } = req.params;
    const application = db.getApplicationById(id, req.user.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found.'
      });
    }

    return res.json({
      success: true,
      data: application
    });
  } catch (err) {
    console.error('Get application by id error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch application details.'
    });
  }
}

export async function createApplication(req, res) {
  try {
    const { company, role } = req.body;

    if (!company || !role) {
      return res.status(400).json({
        success: false,
        message: 'Company name and Role title are required.'
      });
    }

    const application = await db.createApplication(req.user.id, req.body);

    return res.status(201).json({
      success: true,
      message: 'Application created successfully!',
      data: application
    });
  } catch (err) {
    console.error('Create application error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to create application.'
    });
  }
}

export async function updateApplication(req, res) {
  try {
    const { id } = req.params;
    const updated = await db.updateApplication(id, req.user.id, req.body);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Application not found or unauthorized.'
      });
    }

    return res.json({
      success: true,
      message: 'Application updated successfully!',
      data: updated
    });
  } catch (err) {
    console.error('Update application error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to update application.'
    });
  }
}

export async function updateStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['wishlist', 'applied', 'interviewing', 'offer', 'rejected'];
    if (!status || !validStatuses.includes(status.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const updated = await db.updateStatus(id, req.user.id, status);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Application not found or unauthorized.'
      });
    }

    return res.json({
      success: true,
      message: `Status updated to ${status}!`,
      data: updated
    });
  } catch (err) {
    console.error('Update status error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to update application status.'
    });
  }
}

export async function deleteApplication(req, res) {
  try {
    const { id } = req.params;
    const deleted = await db.deleteApplication(id, req.user.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Application not found or unauthorized.'
      });
    }

    return res.json({
      success: true,
      message: 'Application deleted successfully.'
    });
  } catch (err) {
    console.error('Delete application error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete application.'
    });
  }
}

export async function addInterviewRound(req, res) {
  try {
    const { id } = req.params;
    const { roundName, date, status, notes } = req.body;

    if (!roundName) {
      return res.status(400).json({
        success: false,
        message: 'Interview round name is required.'
      });
    }

    const updated = await db.addInterviewRound(id, req.user.id, {
      roundName,
      date,
      status,
      notes
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Application not found or unauthorized.'
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Interview round scheduled successfully!',
      data: updated
    });
  } catch (err) {
    console.error('Add interview error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to add interview round.'
    });
  }
}
