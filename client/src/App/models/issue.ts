export type Root = Root2[]

export interface Root2 {
  id: string
  first_name: string
  second_name: string
  employment_contract_type: string
  created_at: string
  updated_at: string
  id_of_direct_report: string
  projects: Project[]
  issues: Issue2[]
}

export interface Project {
  id: string
  team_id: string
  name: string
  description: string
  description_text: string
  priority: string
  owner_id: string
  status: string
  created_at: string
  updated_at: string
  sprints: Sprint[]
  assignees: string[]
}

export interface Sprint {
  id: string
  name: string
  description: string
  description_text: string
  priority: string
  created_at: string
  updated_at: string
  date_start: string
  date_end: string
  project_id: string
  status: string
  closing_summary: string
  issues: Issue[]
}

export interface Issue {
  id: string
  name: string
  description: string
  description_text: string
  priority: string
  original_estimated_duration: OriginalEstimatedDuration
  currently_estimated_duration: CurrentlyEstimatedDuration
  time_logged: TimeLogged
  status: string
  created_at: string
  updated_at: string
  reporter_id: string
  team_id: string
  project_id: string
  reviewer_id: string
  sprint_id: string
  assignees: string[]
}

export interface OriginalEstimatedDuration {
  ticks: number
  days: number
  hours: number
  milliseconds: number
  minutes: number
  seconds: number
  totalDays: number
  totalHours: number
  totalMilliseconds: number
  totalMinutes: number
  totalSeconds: number
}

export interface CurrentlyEstimatedDuration {
  ticks: number
  days: number
  hours: number
  milliseconds: number
  minutes: number
  seconds: number
  totalDays: number
  totalHours: number
  totalMilliseconds: number
  totalMinutes: number
  totalSeconds: number
}

export interface TimeLogged {
  ticks: number
  days: number
  hours: number
  milliseconds: number
  minutes: number
  seconds: number
  totalDays: number
  totalHours: number
  totalMilliseconds: number
  totalMinutes: number
  totalSeconds: number
}

export interface Issue2 {
  id: string
  name: string
  description: string
  description_text: string
  priority: string
  original_estimated_duration: OriginalEstimatedDuration2
  currently_estimated_duration: CurrentlyEstimatedDuration2
  time_logged: TimeLogged2
  status: string
  created_at: string
  updated_at: string
  reporter_id: string
  team_id: string
  project_id: string
  reviewer_id: string
  sprint_id: string
  assignees: string[]
}

export interface OriginalEstimatedDuration2 {
  ticks: number
  days: number
  hours: number
  milliseconds: number
  minutes: number
  seconds: number
  totalDays: number
  totalHours: number
  totalMilliseconds: number
  totalMinutes: number
  totalSeconds: number
}

export interface CurrentlyEstimatedDuration2 {
  ticks: number
  days: number
  hours: number
  milliseconds: number
  minutes: number
  seconds: number
  totalDays: number
  totalHours: number
  totalMilliseconds: number
  totalMinutes: number
  totalSeconds: number
}

export interface TimeLogged2 {
  ticks: number
  days: number
  hours: number
  milliseconds: number
  minutes: number
  seconds: number
  totalDays: number
  totalHours: number
  totalMilliseconds: number
  totalMinutes: number
  totalSeconds: number
}
