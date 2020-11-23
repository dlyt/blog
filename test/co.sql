select distinct wpb.worker_id,
  bw.worker_name,
  bw.telephone,
  baiP.name province,
    baiC.name city,
      t3.privilege_title privilegeTitle,
        wpb.amount,
        wpb.create_time,
        wpb.invitor_mobile,
    case when 
    (select count(1) from sys_user su where su.mobile = wpb.invitor_mobile) > 0 
    then
    (select distinct su.name from sys_user su where su.mobile = wpb.invitor_mobile limit 0, 1) else 
    (select bw2.worker_name from by_worker bw2 where bw2.telephone = wpb.invitor_mobile and bw2.`enable` = '1' order by create_time desc limit 0, 1) 
    end 
    invitor_name,
    wpb.start_date,
    wpb.end_date,
    case wpb.privilege_status when 0 then '无效' when 1 then '有效' when 2 then '过期' else '' end privilege_status,
    case wpb.refund_time is null when true then '已缴纳' else '已退款' end jt_status,
    aa.sk
    from worker_privilege_buy wpb
    left join by_worker bw on wpb.worker_id = bw.worker_id
    inner join worker_service_area wsa on wpb.worker_id = wsa.worker_id
    inner join by_area_info baiP on wsa.province_code = baiP.code
    inner join by_area_info baiC on wsa.city_code = baiC.code
    inner JOIN by_privilege_info t3 ON wpb.privilege_id = t3.privilege_id
    inner join
    (
      select wsr.worker_id, group_concat(dc.dict_name) sk 
      from worker_skill_ref wsr 
      left join by_dict_config dc on wsr.skill_id = dc.dict_code and dc.parent_id = '500' 
      where wsr.worker_id 
      in (select b.worker_id from worker_privilege_buy b) group by wsr.worker_id
    ) aa 
      on aa.worker_id = wpb.worker_id order by wpb.create_time desc;



      id
      1
      2
      3
      case id 
      when 1 then xiaomin
      when 2 then xioali
      else xiaohong end
      id
      xiaomin
      xiaoli
      