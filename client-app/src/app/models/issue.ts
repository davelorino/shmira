import { Assignee } from './assignee';

export interface Issue {
    id: string;
    name: string;
    description: string;
    description_text: string;
    priority: string;
    original_estimated_duration: string;
    //currently_estimated_duration: string;
    time_logged: string;
    time_remaining: string;
    status: string;
    issue_type: string;
    created_at: Date | null;
    sort_order: number;
    //updated_at: string;
    //reporter: Assignee | null;
    //team_id: string;
    //project_id: string;
    //reviewer_id: string;
    reporter_id: string;
    sprint_id: string;
    assignees: Assignee[];
}
